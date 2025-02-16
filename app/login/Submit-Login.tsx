import React from 'react'
import { useFormStatus } from 'react-dom'

export default function SubmitLogin() {
    const { pending } = useFormStatus();
    return (
        <div>
            <button type="submit" disabled={pending} className={`w-full py-2 rounded ${pending ? "bg-gray-400 cursor-not-allowed" : "bg-gray-900 hover:bg-gray-800"} text-white`}>
                <span className='text-lg md:text-xl'>{pending ? "..." : "Anmelden"}</span>
            </button>
        </div>
    )
}
