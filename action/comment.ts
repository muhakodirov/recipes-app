"use server"

import connectDB from "@/mongodb/mongoConnection";
import Comment from '@/schemas/Comment'
import { CommentType } from "@/utils/ts-types/commentsType";
import { ObjectId } from "mongoose";

export async function saveComment(obj: CommentType): Promise<{
    ok: boolean;
    message: string;
} | void> {
    await connectDB()
    const res = await new Comment({
        comment: obj.comment,
        likes: obj.likes,
        likedBy: obj.likedBy,
        user: {
            id: obj.user.id,
            firstname: obj.user.firstname,
            lastname: obj.user.lastname
        },
        recipeId: obj.recipeId,
    }).save()

    if (!res) {
        return { ok: false, message: 'Failed!' }
    }
}


export async function getComments(recipeId: number) {
    await connectDB()
    const comments = await Comment.find({ recipeId: recipeId })
    return JSON.parse(JSON.stringify(comments))
}


export async function updateLikes(commentId: ObjectId, type: 'increase' | 'decrease', currUserID: string) {
    await connectDB();
    const comment = await Comment.findById(commentId);

    if (!comment) {
        throw new Error('Kommentar nicht gefunden');
    }

    switch (type) {
        case 'increase':
            if (!comment.likedBy?.includes(currUserID)) {  // Prüfe, ob der User schon geliked hat
                comment.likes += 1;  // Likes erhöhen
                comment.likedBy.push(currUserID);  // User zu likedBy hinzufügen
            }
            break;
        case 'decrease':
            comment.likes -= 1;  // Likes verringern
            comment.likedBy = comment.likedBy.filter((id: string) => id !== currUserID);  // User aus likedBy entfernen
            break;
    }

    await comment.save();  // Speichern der Änderungen in der Datenbank

    // Rückgabe als Objekt für das Frontend
    return { likes: comment.likes, likedBy: comment.likedBy };
}

