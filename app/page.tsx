'use client'

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Plus, Search, Home, User, LoaderCircle, Save } from 'lucide-react'
import Link from "next/link"
import Image from "next/image"
import { useQuery } from "@tanstack/react-query"
import { getAllRecipes, getAllRecipesTag } from "@/utils/api-fetch-functions/Recipes"
import { useState } from "react"
import CategoriesCardSkeleton from "@/components/skeleton/CategoriesCardSkeleton"
import Header from "@/components/header/Header"
import { Sidebar } from "@/components/sidebar-menu/sidebar"


export default function HomePage() {
  const [isMoreClicked, setisMoreClicked] = useState<boolean>(true)
  

  const { isFetching, data, error, isError, isLoading } = useQuery({
    queryKey: ['homepage'],
    queryFn: () => getAllRecipes({ pageParam: 0 }),
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    retry: 2
  })

  const { data: tags, isLoading: loading, isFetching: fetching } = useQuery({
    queryKey: ['category'],
    queryFn: () => getAllRecipesTag(),
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    retry: 0,
  })

  return (
    <div className="min-h-screen text-gray-900">
      <div className="max-w-7xl h-screen mx-auto flex flex-col ">
        {/* Header */}
       <Header />
        {/* Main Content */}
        <div className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            {/* Recipe Categories */}
            {(loading || fetching) ? <CategoriesCardSkeleton />
              : <div className="mb-20 mt-10">
                <h2 className="text-xl md:text-2xl font-semibold mb-4">Categories</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  {isMoreClicked ? tags?.slice(0, 6).map((category, index) =>
                    <Button
                      key={index}
                      variant="outline"
                      className="h-24 flex flex-col items-center justify-center bg-white hover:bg-gray-50"
                      asChild
                    >
                      <Link href={`/categories/${category.tag.toLowerCase()}`}>
                        <span className="text-2xl mb-2">{getEmoji(category.tag)}</span>
                        <span className="text-sm font-medium">{category.tag}</span>
                      </Link>
                    </Button>
                  ) : tags?.map((category, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="h-24 flex flex-col items-center justify-center bg-white hover:bg-gray-50"
                      asChild
                    >
                      <Link href={`/categories/${category.tag.toLowerCase()}`}>
                        <span className="text-2xl mb-2">{getEmoji(category.tag)}</span>
                        <span className="text-sm font-medium">{category.tag}</span>
                      </Link>
                    </Button>
                  ))}
                </div>
                <Button onClick={() => setisMoreClicked(!isMoreClicked)} variant="link" className="float-end mt-2"> {isMoreClicked ? 'Show more' : 'Show less'} </Button>
              </div>
            }

            {/* Recipes */}
            {(isFetching || isLoading) ?
              <div className="my-10 flex justify-center items-center w-full h-full">
                <LoaderCircle className='animate-spin size-12' />
              </div>
              : <div>
                <Link href={`/recipes`}>
                  <h2 className="text-xl md:text-2xl font-semibold mb-4 underline ">Recipes</h2>
                </Link>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {data && data?.recipes.map((recipe, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
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
                  ))}
                </div>
                <div className="my-10 flex justify-center items-center w-full h-full text-md lg:text-2xl font-bold"> Visit  <Link className="mx-2 border bg-lime-600 text-white px-2 rounded-lg" href="/recipes"> Recipe </Link>  page for more receipts ❤️ </div>
              </div>}

          </div>
        </div>
      </div>
    </div>
  )
}

function getEmoji(category: string): string {
  switch (category) {
    case 'Italian': return '🍝';
    case 'Asian': return '🌶';
    case 'Cookies': return '🍰';
    case 'Stir-fry': return '⏱️';
    case 'Vegetarian': return '🥗';
    case 'Quick Meals': return '';
    case 'Pizza': return '🍕';
    default: return '🤷‍♂️';
  }
}

