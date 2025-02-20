"use client"

import { useEffect, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Heart} from "lucide-react"
import { useUserContext } from "@/context/User"
import { useMutation, useQueryClient, } from "@tanstack/react-query"
import { saveComment, updateLikes } from "@/action/comment"
import { ResponseCommentType, Session } from "@/utils/ts-types/commentsType"
import { ObjectId } from "mongoose"
import moment from 'moment';
import 'moment/locale/de'; // für deutsche Lokalisierung

moment.locale('de'); // setzt die Sprache auf Deutsch


export default function Comments({ comments, recipeId }: { comments: ResponseCommentType[], recipeId: number }) {
  const [comment, setComment] = useState("")
  const [likeType, setLikeType] = useState<Record<string, 'increase' | 'decrease'>>({})
  const [likedBy, setLikedBy] = useState<{ [key: string]: string[] }>({})
  const { currUser } = useUserContext()
  const [likesState, setLikesState] = useState<Record<string, number>>({});
  const [session, setSession] = useState<Session|null>();
  useEffect(() => {
    const userSession = localStorage.getItem("userSession") ? JSON.parse(localStorage.getItem("userSession")!) : null
    setSession(userSession)
  },[currUser]) 

  
  useEffect(() => {
    if (comments && comments.length > 0) {
      // Erstelle ein neues Objekt, das die likedBy für jede Kommentar-ID enthält
      const likedByMap = comments.reduce((acc, comment) => {
        acc[comment._id.toString()] = comment.likedBy; // Setze für jedes Kommentar die likedBy-Liste
        return acc;
      }, {} as { [key: string]: string[] });
      
      setLikedBy(likedByMap); // Setze das Objekt mit den likedBy-Listen
    }
  }, [comments]);


  const queryClient = useQueryClient()


  const { mutate } = useMutation({
    mutationFn: () => saveComment({
      comment,
      likes: 0,
      likedBy: [],
      user: {
        id: currUser?.id,
        firstname: currUser?.firstname,
        lastname: currUser?.lastname,
      },
      recipeId,
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments'] })
      setComment("")
    },
    onError: (error) => {
      console.error(error)
    },
  })

  const { mutateAsync: likeMutate, isPending } = useMutation({
    mutationFn: async ({ id, type, currUserID }: { id: ObjectId; type: 'increase' | 'decrease'; currUserID:string }) => {
      return await updateLikes(id, type, currUserID); // Jetzt kommt ein Objekt zurück!
    },
    onSuccess(data, variables) {
      if (data && data.likes !== undefined) {
        setLikeType((prev) => ({
          ...prev,
          [variables.id.toString()]: variables.type,
        }));
        setLikedBy((prev) => ({
          ...prev,
          [variables.id.toString()]: data.likedBy, // likedBy-Array aus der Antwort setzen
        }));
        setLikesState((prev) => ({
          ...prev,
          [variables.id.toString()]: data.likes, // Likes richtig setzen
        }));
        // queryClient.invalidateQueries({ queryKey: ['comments'] });
      }
    },
    onError: (error) => {
      console.error("Fehler beim Liken:", error);
    },
  })


  const handleClickComment = () => {
    mutate()
  }

  const handleClickLikes = async (id: ObjectId, currUserID: string) => {
    const newType = likeType[id.toString()] === 'increase' ? 'decrease' : 'increase';

    try {
      await likeMutate({ id, type: newType, currUserID });
    } catch (error) {
      console.error("Fehler beim Mutieren:", error);
    }
  };
  console.log(likedBy)
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
        {!session ? <div className="text-center text-gray-500"> <a href="/login" className="text-blue-400 underline"> Please log in to comment. </a>  </div> : null}
        <div className="space-y-6">
          {comments.length > 0 ? comments.map((comment: ResponseCommentType) => (
            <>
              <div key={comment.comment} className="flex space-x-4 bg-white rounded-lg p-4 shadow-sm">
                <Avatar className="w-10 h-10">
                  <AvatarImage src="/placeholder.svg?height=40&width=40" />
                  <AvatarFallback>{comment.user.firstname[0]}{comment.user.lastname[0]}</AvatarFallback>
                </Avatar>

                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-semibold">{comment.user.firstname}</span>
                      <span className="text-gray-400 text-sm ml-2">•</span>
                      <span className="text-gray-400 text-sm ml-2">{moment(comment?.createdAt).fromNow()}</span>
                    </div>


                  </div>

                  <p className="text-gray-700">{comment.comment}</p>

                  <div className="flex items-center space-x-4 pt-2">
                    <Button
                      onClick={() => handleClickLikes(comment._id, currUser.id)}
                      variant="ghost"
                      size="sm"
                      className="text-gray-500 hover:text-red-500"
                      disabled={isPending || !session}
                    >
                      {likedBy[comment._id.toString()]?.includes(currUser?.id) ? (
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

