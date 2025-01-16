import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'

function CategoriesCardSkeleton() {
  return (
    <div className="mb-20">
      <h2 className="text-xl md:text-2xl font-semibold mb-4">Categories</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="h-24 flex flex-col items-center justify-center bg-white border border-gray-200 rounded-md animate-pulse"
          >
            <div className="w-10 h-10 bg-gray-300 rounded-full mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-16"></div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CategoriesCardSkeleton