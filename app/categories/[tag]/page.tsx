'use client'
import { Button } from "@/components/ui/button"
import { ArrowLeft } from 'lucide-react'
import Link from "next/link"
import Image from "next/image"
import { use } from "react"
import { useQuery } from "@tanstack/react-query"
import { getRecipeByTag } from "@/utils/api-fetch-functions/Recipes"
import RecipeCardSkeleton from "@/components/skeleton/RecipeCardSkeleton"

export default function CategoryPage({ params }: { params: Promise<any> }) {

    const { tag }: any = use(params)

    const { data, isLoading, isFetching, error, isError } = useQuery({
        queryKey: ['tag'],
        queryFn: () => getRecipeByTag(tag),
        refetchOnWindowFocus: false,
    })
    console.log(data)

    if (isFetching || isLoading) {
        return <RecipeCardSkeleton tag={tag} />
    }

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900">
            <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
                <header className="mb-8">
                    <Button variant="ghost" size="sm" asChild className="mb-4">
                        <Link href="/">
                            <ArrowLeft className="h-5 w-5 mr-2" />
                            Back to Categories
                        </Link>
                    </Button>
                    <h1 className="text-3xl font-bold">{tag.toUpperCase()} Recipes</h1>
                </header>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {data?.map((el, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                            <Image
                                src={el.image}
                                alt={`Breakfast Recipe ${el.name}`}
                                width={300}
                                height={200}
                                className="w-full h-40 object-cover"
                            />
                            <div className="p-4">
                                <h2 className="text-lg font-semibold mb-2">{el.name}</h2>
                                <p className="text-sm text-gray-600 mb-3">{el.tags[0]}</p>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-500">{el.cookTimeMinutes} min.</span>
                                    <Button variant="ghost" size="sm" asChild>
                                        <Link href={`/recipes/${el.id}`}>View Recipe</Link>
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

