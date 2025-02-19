"use client"

import { useEffect, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Heart, HeartCrack, Reply } from "lucide-react"
import { useUserContext } from "@/context/User"
import { useMutation, useQueryClient, } from "@tanstack/react-query"
import { saveComment, updateLikes } from "@/action/comment"
import { CommentType, ResponseCommentType } from "@/utils/ts-types/commentsType"
import { ObjectId, set } from "mongoose"
import { nanoid } from 'nanoid';



export default function Comments({ comments, recipeId }: { comments: ResponseCommentType[], recipeId: number }) {
  const [comment, setComment] = useState("")
  const [likeType, setLikeType] = useState<Record<string, 'increase' | 'decrease'>>({})
  const { currUser } = useUserContext()
  const [likesState, setLikesState] = useState<Record<string, number>>({});
  const session = localStorage?.getItem("userSession") ? JSON.parse(localStorage.getItem("userSession")!) : null

  const queryClient = useQueryClient()

  console.log(likesState)
  const newCommentObj: CommentType = {
    comment: comment,
    likes: 0,
    user: {
      id: currUser?.id,
      firstname: currUser?.firstname,
      lastname: currUser?.lastname,
    },
    recipeId: recipeId
  }
  // console.log(newCommentObj)
  //useMutate for re-fetch
  const { mutate } = useMutation({
    mutationFn: () => saveComment(newCommentObj),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments'] })
      setComment("")
    },
    onError: (error) => {
      console.error(error)
    },
  })

  const { mutateAsync: likeMutate } = useMutation({
    mutationFn: async ({ id, type }: { id: ObjectId; type: 'increase' | 'decrease' }) => {
      return await updateLikes(id, type); // Jetzt kommt ein Objekt zurück!
    },
    onSuccess(data, variables) {
      if (data && data.likes !== undefined) {
        setLikeType((prev) => ({
          ...prev,
          [variables.id.toString()]: variables.type,
        }));

        setLikesState((prev) => ({
          ...prev,
          [variables.id.toString()]: data.likes, // Likes richtig setzen
        }));
      }
    },
    onError: (error) => {
      console.error("Fehler beim Liken:", error);
    },
  })

  const handleClickComment = () => {
    mutate()
  }

  const handleClickLikes = async (id: ObjectId) => {
    const newType = likeType[id.toString()] === 'increase' ? 'decrease' : 'increase';

    try {
      await likeMutate({ id, type: newType });
    } catch (error) {
      console.error("Fehler beim Mutieren:", error);
    }
  };
  // if (error) return <p>Fehler beim Laden der Kommentare.</p>;

  return (
    <div className="container mx-auto max-w-4xl py-8">
      <div className="border-t border-gray-200 pt-8">
        <h2 className="text-2xl font-semibold mb-8">Comments</h2>

        {/* Comment Input */}
        <div className="mb-8">
          <div className="flex items-start space-x-4">
            <Avatar className="w-10 h-10">
              <AvatarImage src="/placeholder.svg?height=40&width=40" />
              <AvatarFallback>{(!session) ? '?' : <> {currUser?.firstname?.charAt(0)}{currUser?.lastname?.charAt(0)}</>}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <Textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your thoughts..."
                className="min-h-[100px] resize-none"

              />
              <div className="mt-4 flex justify-end">
                <Button
                  onClick={handleClickComment}
                  disabled={!session}
                >
                  Post Comment
                </Button>
              </div>
            </div>
          </div>
        </div>
        {(session?.expires || !session) < Date.now() / 1000 ? <div className="text-center text-gray-500"> <a href="/login" className="text-blue-400 underline"> Please log in to comment. </a>  </div> : null}
        <div className="space-y-6">
          {comments.length > 0 ? comments.map((comment: ResponseCommentType, index: number) => (
            <>
              <div key={nanoid()} className="flex space-x-4 bg-white rounded-lg p-4 shadow-sm">
                <Avatar className="w-10 h-10">
                  <AvatarImage src="/placeholder.svg?height=40&width=40" />
                  <AvatarFallback>{comment.user.firstname[0]}{comment.user.lastname[0]}</AvatarFallback>
                </Avatar>

                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-semibold">{comment.user.firstname}</span>
                      <span className="text-gray-400 text-sm ml-2">•</span>
                      <span className="text-gray-400 text-sm ml-2">{(comment.updatedAt).toLocaleString()}</span>
                    </div>


                  </div>

                  <p className="text-gray-700">{comment.comment}</p>

                  <div className="flex items-center space-x-4 pt-2">
                    <Button
                      onClick={() => handleClickLikes(comment._id)}
                      variant="ghost"
                      size="sm"
                      className="text-gray-500 hover:text-red-500"
                    >
                      {likeType[comment._id.toString()] === 'increase' ? (
                        <Heart fill="red" className="h-4 w-4 mr-2 text-red-600" />
                      ) : (
                        <Heart className="h-4 w-4 mr-2 " />
                      )}
                      {likesState[comment._id.toString()] ?? comment.likes}
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )) : <div className="text-center text-gray-500">No comments yet.</div>}
        </div>
      </div>
    </div>
  )
}

