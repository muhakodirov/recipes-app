"use client"
import Image from 'next/image'
import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'
import { Recipe } from '@/utils/ts-types/recipes'

export default function RecipeCard({data}:{data:Recipe[]}) {
  return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {data && data?.map((recipe, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
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
          ))}
        </div>
  )
}

