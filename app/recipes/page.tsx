'use client'

import { useCallback, useRef, useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Filter, LoaderCircle, ArrowLeft } from 'lucide-react'
import Link from "next/link"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useInfiniteQuery } from '@tanstack/react-query'
import { getAllRecipes } from '@/utils/api-fetch-functions/Recipes'
import create from '@/action/create'

const categories = [
  "All", "Pizza", "Italian", "Vegetarian", "Stir-fry", "Asian", "Cookies", "Dessert",
  "Baking", "Pasta", "Chicken", "Salsa", "Salad", "Quinoa", "Bruschetta", "Beef",
  "Caprese", "Shrimp", "Biryani", "Main course", "Indian", "Pakistani", "Karahi",
  "Keema", "Potatoes", "Kebabs", "Saag", "Roti", "Ramen", "Japanese", "Soup",
  "Tagine", "Chickpea", "Moroccan", "Bibimbap", "Korean", "Rice", "Moussaka",
  "Greek", "Butter chicken", "Curry", "Thai", "Lassi", "Mango", "Tiramisu",
  "Turkish", "Grilling", "Smoothie", "Blueberry", "Banana", "Elote", "Mexican",
  "Street food", "Borscht", "Russian", "Dosa", "Falafel", "Lebanese", "Wrap",
  "Caipirinha", "Brazilian", "Cocktail", "Patatas bravas", "Spanish",
  "Spring rolls", "Vietnamese", "Quinoa salad", "Mediterranean",
  "Matcha ice cream", "Brigadeiros", "Enchiladas", "Shrimp curry", "Spanakopita",
  "Couscous salad", "Mojito", "Cuban", "Teriyaki chicken", "Mango salsa",
  "Shrimp stir-fry", "Quick", "Margherita pizza", "Pesto pasta", "Chicken skewers",
  "Hawaiian", "Sushi rolls", "Chickpea salad", "Pineapple", "Coconut"
];

export default function AllRecipesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const observer = useRef<IntersectionObserver>(null);


  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['allrecipes'],
    queryFn: getAllRecipes,
    initialPageParam: 0,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    getNextPageParam: (lastPage) => {
      const { skip, limit, total } = lastPage;
      const nextSkip = skip + limit;
      return nextSkip < total ? nextSkip : undefined; // Falls alle Rezepte geladen sind, keine weitere Seite abrufen
    },
  })


  const lastElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (isLoading || isFetchingNextPage) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetching) {
          fetchNextPage();
        }
      });

      if (node) observer.current.observe(node);
    },
    [isLoading, isFetchingNextPage, fetchNextPage, hasNextPage]
  );

  const allRecipes = data?.pages.flatMap(page => page.recipes) || [];

  const filteredRecipes = allRecipes.filter((recipe) =>
    recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategory === "All" || recipe.tags.includes(selectedCategory))
  )

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
        <Button variant="ghost" size="sm" asChild className="mb-4">
          <Link href="/">
            <ArrowLeft className="h-5 w-5 mr-2" />
            <p className="hidden md:block text-xl"> Back to Home </p>
          </Link>
        </Button>
        <h1 className="text-3xl font-bold my-6">All Recipes</h1>
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
          {filteredRecipes?.map((recipe) => (
            <div key={recipe.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src={recipe.image || "/placeholder.svg"}
                alt={recipe.name}
                width={300}
                height={200}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-2">{recipe.name}</h2>
                <p className="text-sm text-gray-600 mb-3">{recipe.tags[0]}</p>
                <div ref={lastElementRef} className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">{recipe.cookTimeMinutes} min.</span>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/recipes/${recipe.id}`}>View Recipe</Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {isFetching && <div className="my-10 flex justify-center items-center w-full h-full"> <LoaderCircle className='animate-spin size-12' /> </div>}
      </div>
    </div>
  )
}

