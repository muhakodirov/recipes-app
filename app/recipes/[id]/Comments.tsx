"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Heart, Reply } from "lucide-react"
import { useUserContext } from "@/context/User"
import { useMutation, useQueryClient, } from "@tanstack/react-query"
import {saveComment} from "@/action/comment"
import { CommentType, ResponseCommentType } from "@/utils/ts-types/commentsType"



export default function Comments({comments, recipeId}:{comments:ResponseCommentType[], recipeId: number}) {
  const [comment, setComment] = useState("")
  const [likes, setLikes] = useState<number>(0)
  const {currUser} = useUserContext()
 
  const queryClient = useQueryClient()



  const newCommentObj: CommentType = {
    comment: comment,
    likes: likes,
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

  const handleClickComment = () => {
    mutate()
  }

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
              <AvatarFallback>{currUser?.firstname?.charAt(0)}{currUser?.lastname?.charAt(0)}</AvatarFallback>
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
                  disabled={!currUser}
                >
                  Post Comment
                </Button>
              </div>
            </div>
          </div>
        </div>
        { currUser ? <div className="space-y-6">
          {comments.length > 0 ? comments.map((comment:ResponseCommentType, index:number) => (
            <>
             <div key={(comment.updatedAt).toString()} className="flex space-x-4 bg-white rounded-lg p-4 shadow-sm">
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
                  <Button variant="ghost" size="sm" className="text-gray-500 hover:text-red-500">
                    <Heart className="h-4 w-4 mr-2" />
                    {comment.likes}
                  </Button>
                 
                </div>
              </div>
            </div>
            </>
          )): <div className="text-center text-gray-500">No comments yet.</div>}
        </div> : <div className="text-center text-gray-500 "> <a href="/login" className="text-blue-400 underline"> Please log in to comment. </a>  </div>}
      </div>
    </div>
  )
}

