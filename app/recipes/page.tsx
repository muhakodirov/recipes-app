'use client'

import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Filter } from 'lucide-react'
import Link from "next/link"
import Image from "next/image"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// Mock data for recipes and categories
const recipes = [
  { id: 1, title: "Pancakes", category: "Breakfast", time: "20 min", image: "/placeholder.svg?height=200&width=300&text=Pancakes" },
  { id: 2, title: "Spaghetti Bolognese", category: "Dinner", time: "45 min", image: "/placeholder.svg?height=200&width=300&text=Spaghetti" },
  { id: 3, title: "Caesar Salad", category: "Lunch", time: "15 min", image: "/placeholder.svg?height=200&width=300&text=Salad" },
  { id: 4, title: "Chocolate Cake", category: "Desserts", time: "60 min", image: "/placeholder.svg?height=200&width=300&text=Cake" },
  { id: 5, title: "Vegetable Stir Fry", category: "Vegetarian", time: "30 min", image: "/placeholder.svg?height=200&width=300&text=Stir+Fry" },
  { id: 6, title: "Smoothie Bowl", category: "Breakfast", time: "10 min", image: "/placeholder.svg?height=200&width=300&text=Smoothie" },
]

const categories = ["All", "Breakfast", "Lunch", "Dinner", "Desserts", "Vegetarian", "Quick Meals"]

export default function AllRecipesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  const filteredRecipes = recipes.filter(recipe => 
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategory === "All" || recipe.category === selectedCategory)
  )

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
        <h1 className="text-3xl font-bold mb-6">All Recipes</h1>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input 
              placeholder="Search recipes..." 
              className="pl-10 bg-white border-gray-200 focus:border-gray-400 focus:ring-gray-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredRecipes.map((recipe) => (
            <div key={recipe.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <Image
                src={recipe.image || "/placeholder.svg"}
                alt={recipe.title}
                width={300}
                height={200}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-2">{recipe.title}</h2>
                <p className="text-sm text-gray-600 mb-3">{recipe.category}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">{recipe.time}</span>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/recipes/${recipe.id}`}>View Recipe</Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

