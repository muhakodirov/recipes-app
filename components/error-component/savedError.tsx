"use client"
import { Snail } from 'lucide-react';
export default function SavedError() {
  return (
    <div className="flex justify-center items-center flex-col mt-32">
        <Snail className=' animate-bounce hover:paused text-green-500 size-60 text-5xl'/>
        <h1 className="text-4xl font-bold"> Du hast keine Rezepte gespeichert </h1>
    </div>
  )
}
