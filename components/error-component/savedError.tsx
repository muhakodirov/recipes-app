"use client"
import { Rabbit, Snail } from 'lucide-react';
export default function SavedError() {
  return (
    <div className="flex justify-center items-center flex-col mt-32">
        <Rabbit className=' text-gray-800 size-48 md:size-52 lg:size-60 text-5xl'/>
        {/* <h1 className="text-2xl lg:text-3xl"> Du hast keine Rezepte gespeichert </h1> */}
    </div>
  )
}
