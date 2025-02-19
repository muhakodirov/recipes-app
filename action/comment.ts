"use server"

import connectDB from "@/mongodb/mongoConnection";
import Comment from '@/schemas/Comment'
import { CommentType } from "@/utils/ts-types/commentsType";

export async function saveComment(obj: CommentType): Promise<{
    ok: boolean;
    message: string;
}|void>{
    await connectDB()
    const res = await new Comment({
        comment: obj.comment,
        likes:obj.likes,
        user: {
            id: obj.user.id,
            firstname: obj.user.firstname,
            lastname: obj.user.lastname
        },
        recipeId: obj.recipeId,
    }).save()

    if (!res) {
        return {ok: false, message: 'Failed!'}
    }
}


export async function getComments(recipeId: number) {
    await connectDB()
    const comments = await Comment.find({ recipeId: recipeId })
    return JSON.parse(JSON.stringify(comments))
}

