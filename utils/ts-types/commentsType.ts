import { ObjectId } from "mongoose"

export type CommentType = {
    comment: string,
    likes: number,
    likedBy: string[],
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
    likedBy: string[],
    user: {
        id: string
        firstname: string,
        lastname: string,
    },
    recipeId: number,
    createdAt: Date,
    updatedAt: Date,
}

export type Session = {
    expires: number;
    user: {
        id: string;
        email: string;
        firstname: string;
        lastname: string;
    };
  };