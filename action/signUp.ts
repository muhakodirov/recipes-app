"use server"
import connectDB from "@/mongodb/mongoConnection";
import User from '@/schemas/User';
import { redirect } from "next/navigation";
import { randomUUID } from 'crypto';

interface ErrorResponse {
    error: boolean;
    message: string;
}

export async function signUp(formData: FormData): Promise<ErrorResponse | void> {
    const firstName = formData.get('firstname') as string;
    const lastName = formData.get('lastname') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if (!firstName || !lastName || !email || !password) {
        return {
            error: true,
            message: 'Bitte füllen Sie alle Felder aus.'
        };
    }

    //TODO: Encrypt password before saving
    try {
        await connectDB()
        const foundEmail = await User.findOne({ email });
        if (foundEmail) {
            return {
                error: true,
                message: 'Diese Email ist schon in unserer Datenbank vorhanden. Bitte loggen Sie sich ein.'
            };
        } else {
            await new User({
                firstName,
                lastName,
                email,
                password,
                userId: randomUUID(),
            }).save();
        }
        return {
            error: false,
            message: ''
        }
    } catch (error) {
        console.error("Fehler beim Speichern des Nutzers:", error);
        return {
            error: true,
            message: ' Fehler beim Speichern des Nutzers. Bitte versuchen Sie es später noch einmal.'
        };
    }
    // redirect('/login')
}

