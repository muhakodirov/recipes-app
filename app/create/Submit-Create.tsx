import { Button } from '@/components/ui/button';
import React from 'react'
import { useFormStatus } from 'react-dom'

export default function SubmitCreate() {
    const { pending } = useFormStatus();
    return (
        <div className="flex justify-end">
            <Button className={`${pending ? "bg-gray-400 text-gray-900 cursor-not-allowed" : "bg-gray-900 hover:bg-gray-800"}`} type="submit">Create Recipe</Button>
        </div>
    )
}
