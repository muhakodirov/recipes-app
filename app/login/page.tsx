import LoginForm from './Login-Form'
import { Suspense } from "react";

export default function Login() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <LoginForm />
        </Suspense>
    )
}
