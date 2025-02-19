"use server"

import connectDB from "@/mongodb/mongoConnection"
import User from "@/schemas/User";
import bcryptjs from 'bcryptjs'


type UserType = {
    id: string,
    email: string,
    firstname: string,
    lastname: string,
}

interface Response {
    ok: boolean;
    message?: string;
    user?: UserType;
}

export default async function signIn(formData: FormData): Promise<Response | void> {
    await connectDB();
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const user = await User.findOne({ email });
    if (!user) {
        return { ok: false, message: 'Benutzer wurde nicht gefunden' };
    }
    const validPassword = await bcryptjs.compare(password, user.password)
    if(!validPassword) {
        return { ok: false, message: 'Passwort ist falsch' };
    }

    // redirect('/profile');
    const userObject = {
        id: user.id,
        email: user.email,
        firstname: user.firstName,
        lastname: user.lastName,
    }
    return { ok: true, user: userObject };

}