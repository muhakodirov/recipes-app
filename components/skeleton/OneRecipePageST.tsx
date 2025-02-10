import { Button } from "@/components/ui/button"
import { ArrowLeft, BookmarkPlus, Clock, Users } from 'lucide-react'
import Link from "next/link"

export default function RecipeSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 animate-pulse">
      <div className="max-w-4xl mx-auto p-4 md:p-6 lg:p-8">
        <Button variant="ghost" size="sm" asChild className="mb-4">
          <Link href="/categories/breakfast">
            <ArrowLeft className="h-5 w-5 mr-2" />
          </Link>
        </Button>

        <div className="w-full h-96 bg-gray-300 rounded-lg mb-6"></div>

        <div className="flex justify-between items-center mb-6">
          <div className="h-10 bg-gray-300 rounded w-1/2"></div>
          <div className="h-10 w-40 bg-gray-300 rounded"></div>
        </div>

        <div className="flex gap-4 mb-6">
          <div className="flex items-center">
            <Clock className="h-5 w-5 mr-2 text-gray-300" />
            <div className="h-5 w-20 bg-gray-300 rounded"></div>
          </div>
          <div className="flex items-center">
            <Clock className="h-5 w-5 mr-2 text-gray-300" />
            <div className="h-5 w-20 bg-gray-300 rounded"></div>
          </div>
          <div className="flex items-center">
            <Users className="h-5 w-5 mr-2 text-gray-300" />
            <div className="h-5 w-20 bg-gray-300 rounded"></div>
          </div>
        </div>

        <div className="mb-8">
          <div className="h-8 bg-gray-300 rounded w-1/4 mb-4"></div>
          <div className="space-y-2">
            {[1, 2, 3, 4, 5].map((index) => (
              <div key={index} className="h-5 bg-gray-300 rounded w-full"></div>
            ))}
          </div>
        </div>

        <div>
          <div className="h-8 bg-gray-300 rounded w-1/4 mb-4"></div>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((index) => (
              <div key={index} className="h-5 bg-gray-300 rounded w-full"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
