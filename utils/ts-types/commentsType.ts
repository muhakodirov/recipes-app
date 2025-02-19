import { ObjectId } from "mongoose"

export type CommentType = {
    comment: string,
    likes: number,
    user: {
        id: string
        firstname: string,
        lastname: string,
    },
    recipeId: number,
}

export type ResponseCommentType = {
    _id: ObjectId,
    comment: string,
    likes: number,
    user: {
        id: string
        firstname: string,
        lastname: string,
    },
    recipeId: number,
    createdAt: Date,
    updatedAt: Date,
}