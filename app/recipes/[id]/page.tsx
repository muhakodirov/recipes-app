'use client'

import { Button } from "@/components/ui/button"
import { ArrowLeft, Clock, Users, BookmarkPlus } from 'lucide-react'
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"

export default function RecipePage({ params }: { params: { id: string } }) {
    const [isSaved, setIsSaved] = useState(false)

    // This would typically come from an API or database
    const recipe = {
        id: params.id,
        title: "Fluffy Pancakes",
        description: "Start your day with these delicious, light, and fluffy pancakes. Perfect for a weekend breakfast or brunch!",
        prepTime: "10 min",
        cookTime: "15 min",
        servings: 4,
        image: "/placeholder.svg?height=400&width=600&text=Fluffy Pancakes",
        ingredients: [
            "1 1/2 cups all-purpose flour",
            "3 1/2 teaspoons baking powder",
            "1/4 teaspoon salt",
            "1 tablespoon sugar",
            "1 1/4 cups milk",
            "1 egg",
            "3 tablespoons melted butter"
        ],
        instructions: [
            "In a large bowl, sift together the flour, baking powder, salt, and sugar.",
            "In another bowl, whisk together the milk, egg, and melted butter.",
            "Pour the wet ingredients into the dry ingredients and whisk until just combined. Don't overmix; some small lumps are okay.",
            "Heat a lightly oiled griddle or frying pan over medium-high heat.",
            "For each pancake, pour 1/4 cup of batter onto the griddle.",
            "Cook until bubbles form on the surface, then flip and cook until golden brown on both sides.",
            "Serve hot with your favorite toppings like maple syrup, fresh berries, or whipped cream."
        ]
    }

    const handleSave = () => {
        // In a real app, this would call an API to save the recipe
        setIsSaved(!isSaved)
    }

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900">
            <div className="max-w-4xl mx-auto p-4 md:p-6 lg:p-8">
                <Button variant="ghost" size="sm" asChild className="mb-4">
                    <Link href="/categories/breakfast">
                        <ArrowLeft className="h-5 w-5 mr-2" />
                        Back to Breakfast Recipes
                    </Link>
                </Button>

                <Image
                    src={recipe.image}
                    alt={recipe.title}
                    width={600}
                    height={400}
                    className="w-full h-64 object-cover rounded-lg mb-6"
                />

                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold">{recipe.title}</h1>
                    <Button onClick={handleSave} variant={isSaved ? "secondary" : "outline"}>
                        <BookmarkPlus className="h-5 w-5 mr-2" />
                        {isSaved ? "Saved" : "Save Recipe"}
                    </Button>
                </div>

                <p className="text-gray-600 mb-6">{recipe.description}</p>

                <div className="flex gap-4 mb-6">
                    <div className="flex items-center">
                        <Clock className="h-5 w-5 mr-2 text-gray-500" />
                        <span>Prep: {recipe.prepTime}</span>
                    </div>
                    <div className="flex items-center">
                        <Clock className="h-5 w-5 mr-2 text-gray-500" />
                        <span>Cook: {recipe.cookTime}</span>
                    </div>
                    <div className="flex items-center">
                        <Users className="h-5 w-5 mr-2 text-gray-500" />
                        <span>Serves: {recipe.servings}</span>
                    </div>
                </div>

                <div className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">Ingredients</h2>
                    <ul className="list-disc list-inside space-y-2">
                        {recipe.ingredients.map((ingredient, index) => (
                            <li key={index}>{ingredient}</li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h2 className="text-2xl font-semibold mb-4">Instructions</h2>
                    <ol className="list-decimal list-inside space-y-4">
                        {recipe.instructions.map((step, index) => (
                            <li key={index} className="pl-2">
                                <span className="font-medium">Step {index + 1}:</span> {step}
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        </div>
    )
}

