'use client'

import { Button } from "@/components/ui/button"
import { ArrowLeft, Clock, Users, BookmarkPlus, Divide, Utensils, Earth, Weight, Dumbbell, BookmarkMinus } from 'lucide-react'
import Link from "next/link"
import Image from "next/image"
import { use, useState } from "react"
import { Recipe } from "@/utils/ts-types/recipes"
import OneRecipePageST from "@/components/skeleton/OneRecipePageST"
import Error from "./error"
import { useQuery } from "@tanstack/react-query"
import { getRecipeById } from "@/utils/api-fetch-functions/Recipes"
import { useRecipeContext } from "@/context/Recipe"



export default function OneRecipePage({ params }:{ params: Promise<{id: string}> }) {
    const {savedRecipes,saveRecipe,deleteRecipe} = useRecipeContext()
    const { id } = use(params)
    const isExist = savedRecipes.some((el) => el.id === parseInt(id))
    console.log(isExist)

    const { isFetching, data, error, isError } = useQuery({
        queryKey: ['todos'],
        queryFn: () => getRecipeById(id),
        refetchOnWindowFocus: false,
        retry: 0
    })

    const handleSave = (obj:Recipe) => {
        saveRecipe(obj)
    }
    const handleDelete = (id:any) => {
        deleteRecipe(id)
    }

    if (isError) {
        return <Error message={error?.message} />
    }

    if (isFetching) {
        return <OneRecipePageST />
    }

    return (
        <>
            {data && <div className="min-h-screen bg-gray-50 text-gray-900">
                <div className="max-w-4xl mx-auto p-4 md:p-6 lg:p-8">
                    <Button variant="ghost" size="sm" asChild className="mb-4">
                        <Link href="/recipes">
                            <ArrowLeft className="h-5 w-5 mr-2" />
                            <p className="hidden md:block text-xl"> Back to Recipes </p>
                        </Link>
                    </Button>

                    <Image
                        src={data?.image}
                        alt={data?.name}
                        width={600}
                        height={400}
                        className="w-full max-h-96 object-cover rounded-lg mb-6"
                    />

                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-3xl font-bold">{data?.name}</h1>
                        {isExist ? 
                            <Button onClick={() => handleDelete(data.id)} variant={"secondary"}>
                                <BookmarkMinus className="h-5 w-5 mr-1" />
                            </Button>
                            : <Button onClick={() => handleSave(data)} variant={"outline"}>
                                <BookmarkPlus className="h-5 w-5 mr-1" />
                            </Button> }          
                    </div>

                    <div className="flex flex-wrap gap-4 mb-6">
                        <div className="flex items-center">
                            <Clock className="h-5 w-5 mr-2 text-gray-500" />
                            <span>Prep: {data?.prepTimeMinutes} min.</span>
                        </div>
                        <div className="flex items-center">
                            <Clock className="h-5 w-5 mr-2 text-gray-500" />
                            <span>Cook: {data?.cookTimeMinutes} min.</span>
                        </div>
                        <div className="flex items-center">
                            <Users className="h-5 w-5 mr-2 text-gray-500" />
                            <span>Serves: {data?.servings}</span>
                        </div>
                        <div className="flex items-center">
                            <Earth className="h-5 w-5 mr-2 text-gray-500" />
                            <span>Cuisine: {data?.cuisine}</span>
                        </div>
                        <div className="flex items-center">
                            <Weight className="h-5 w-5 mr-2 text-gray-500" />
                            <span>Difficulty: {data?.difficulty}</span>
                        </div>
                        <div className="flex items-center">
                            <Dumbbell className="h-5 w-5 mr-2 text-gray-500" />
                            <span>Calories per Serving: {data?.caloriesPerServing}</span>
                        </div>
                    </div>

                    <div className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">Ingredients</h2>
                        <ul className="list-disc list-inside space-y-2">
                            {data?.ingredients.map((ingredient, index) => (
                                <li key={index}>{ingredient}</li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold mb-4">Instructions</h2>
                        <ol className="list-decimal list-inside space-y-4">
                            {data?.instructions.map((step, index) => (
                                <li key={index} className="pl-2">
                                    <span className="font-medium">Step:</span> {step}
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>
            </div>}

        </>
    )
}

