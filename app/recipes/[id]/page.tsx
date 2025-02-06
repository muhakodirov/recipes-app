'use client'
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { getRecipeById } from "@/utils/api-fetch-functions/Recipes"
import OneRecipePage from "./OneRecipePage"
import { use } from "react"

export default function RecipeIDPage({ params }: { params: Promise<any> }) {
    const { id } = use(params)
    const { isFetching, data, error, isError } = useQuery({
        queryKey: ['todos'],
        queryFn: () => getRecipeById(id),
        refetchOnWindowFocus: false,
        retry: 0
    })
    return (
        <>
            <OneRecipePage data={data} loading={isFetching} error={error} isError={isError} />
        </>
    )
}

