import React from 'react'
import { Button } from '../ui/button'
import { ArrowLeft } from 'lucide-react'

function RecipeCardSkeleton({tag}:{tag:string}) {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
    <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
        <header className="mb-8">
            <Button variant="ghost" size="sm" className="mb-4">
                    <ArrowLeft className="h-5 w-5 mr-2" />
            </Button>
            <h1 className="text-3xl font-bold">{tag.toUpperCase()} Recipes</h1>
        </header>
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
    {Array.from({ length: 6 }).map((_, index) => (
      <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
        <div className="w-full h-40 bg-gray-300" /> {/* Image placeholder */}
        <div className="p-4">
          <div className="h-6 bg-gray-300 rounded w-3/4 mb-2" /> {/* Title placeholder */}
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-3" /> {/* Tag placeholder */}
          <div className="flex justify-between items-center">
            <div className="h-4 bg-gray-200 rounded w-1/4" /> {/* Time placeholder */}
            <div className="h-8 bg-gray-200 rounded w-24" /> {/* Button placeholder */}
          </div>
        </div>
      </div>
    ))}
  </div>
  </div>
  </div>
  )
}

export default RecipeCardSkeleton