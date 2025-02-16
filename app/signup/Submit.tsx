"use client"

import { useFormStatus } from 'react-dom';

export default function Submit() {
    const { pending } = useFormStatus();
    console.log(pending);
    return (
        <button type="submit" disabled={pending} className={`w-full py-2 rounded ${pending ? "bg-gray-400 cursor-not-allowed" : "bg-gray-900 hover:bg-gray-800"} text-white`}>
            <span className='text-lg md:text-xl'>{pending ? "Registriere..." : "Registrieren"}</span>
        </button>
    )
}
