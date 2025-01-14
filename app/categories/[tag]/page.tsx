import { Button } from "@/components/ui/button"
import { ArrowLeft } from 'lucide-react'
import Link from "next/link"
import Image from "next/image"

export default function CategoryPage() {
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
                    <h1 className="text-3xl font-bold">Breakfast Recipes</h1>
                </header>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {[1, 2, 3, 4, 5, 6].map((index) => (
                        <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                            <Image
                                src={`/placeholder.svg?height=200&width=300&text=Breakfast ${index}`}
                                alt={`Breakfast Recipe ${index}`}
                                width={300}
                                height={200}
                                className="w-full h-40 object-cover"
                            />
                            <div className="p-4">
                                <h2 className="text-lg font-semibold mb-2">Delicious Breakfast {index}</h2>
                                <p className="text-sm text-gray-600 mb-3">Start your day with this amazing breakfast recipe...</p>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-500">20 min</span>
                                    <Button variant="ghost" size="sm" asChild>
                                        <Link href={`/recipes/${index}`}>View Recipe</Link>
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

