'use client'

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Plus, Search, Home, User } from 'lucide-react'
import Link from "next/link"
import Image from "next/image"



export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <div className="max-w-7xl h-screen mx-auto flex flex-col ">
        {/* Header */}
        <header className="p-4 bg-white lg:bg-gray-50 shadow-sm lg:shadow-none">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800">InRecipes</h1>
            <div className="hidden md:block w-1/3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search recipes..."
                  className="pl-10 bg-white border-gray-200 focus:border-gray-400 focus:ring-gray-400"
                />
              </div>
            </div>
            <nav className="hidden md:flex space-x-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/">
                  <Home className="h-5 w-5 mr-2" />
                  Home
                </Link>
              </Button>
              <Button variant="ghost" size="sm">
                <Plus className="h-5 w-5 mr-2" />
                Add Recipe
              </Button>
              <Button variant="ghost" size="sm">
                <User className="h-5 w-5 mr-2" />
                Profile
              </Button>
            </nav>
          </div>
        </header>

        {/* Main Content */}
        <div className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            {/* Mobile Search Bar */}
            <div className="md:hidden mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search recipes..."
                  className="pl-10 bg-white border-gray-200 focus:border-gray-400 focus:ring-gray-400"
                />
              </div>
            </div>

            {/* Recipe Categories */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Categories</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {['Breakfast', 'Lunch', 'Dinner', 'Desserts', 'Vegetarian', 'Quick Meals'].map((category) => (
                  <Button
                    key={category}
                    variant="outline"
                    className="h-24 flex flex-col items-center justify-center bg-white hover:bg-gray-50"
                    asChild
                  >
                    <Link href={`/categories/${category.toLowerCase()}`}>
                      <span className="text-2xl mb-2">{getEmoji(category)}</span>
                      <span className="text-sm font-medium">{category}</span>
                    </Link>
                  </Button>
                ))}
              </div>
            </div>

            {/* Recipes */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Recipes</h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3, 4, 5, 6].map((index) => (
                  <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                    <Image
                      src={`/placeholder.svg?height=200&width=300&text=Recipe ${index}`}
                      alt={`Recipe ${index}`}
                      width={300}
                      height={200}
                      className="w-full h-40 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="text-lg font-semibold mb-2">Recipe Title {index}</h3>
                      <p className="text-sm text-gray-600 mb-3">Quick description of the recipe...</p>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">15 min</span>
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/recipes/${index}`}>View</Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <nav className="md:hidden p-4 bg-white shadow-sm">
          <div className="flex justify-between items-center max-w-xs mx-auto">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/">
                <Home className="h-6 w-6" />
                <span className="sr-only">Home</span>
              </Link>
            </Button>
            <Button variant="ghost" size="icon">
              <Plus className="h-6 w-6" />
              <span className="sr-only">Add new</span>
            </Button>
            <Button variant="ghost" size="icon">
              <User className="h-6 w-6" />
              <span className="sr-only">Profile</span>
            </Button>
          </div>
        </nav>
      </div>
    </div>
  )
}

function getEmoji(category: string): string {
  switch (category) {
    case 'Breakfast': return '🍳';
    case 'Lunch': return '🥪';
    case 'Dinner': return '🍽️';
    case 'Desserts': return '🍰';
    case 'Vegetarian': return '🥗';
    case 'Quick Meals': return '⏱️';
    default: return '🍴';
  }
}

