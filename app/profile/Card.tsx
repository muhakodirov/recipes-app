"use client"
import Image from 'next/image'
import React from 'react'
import { Button } from '../../components/ui/button'
import Link from 'next/link'
import { SearchX } from 'lucide-react'

export default function Card({ data }: { data: any }) {
    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {data.length > 0 ? data?.map((recipe: any) => (
                <div key={recipe.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                    <Image
                        src={recipe.image}
                        alt={`Recipe ${recipe.name}`}
                        width={300}
                        height={200}
                        className="w-full h-40 object-cover"
                    />
                    <div className="p-4">
                        <h3 className="text-lg font-semibold mb-2">{recipe.name}</h3>
                        <p className="text-sm text-gray-600 mb-3"> {recipe.tags[0]}, {recipe.tags[1]},{recipe.tags[0]}, {recipe.tags[2]} </p>
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-500">{recipe.cookTimeMinutes}</span>
                            <Button variant="ghost" size="sm" asChild>
                                <Link href={`/recipes/${recipe.id}`}>View</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            )) : <div className='border flex justify-center items-center p-4 rounded-xl bg-slate-50 min-w-[400px] min-h-[250px]'>
                <SearchX size={100} className='' />
            </div>}
        </div>
    )
}

