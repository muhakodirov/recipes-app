'use server'
import OneRecipePage from "./OneRecipePage"

export default async function RecipeIDPage({ params }:{ params: Promise<{id: string}> }) {
    return (
        <>
            <OneRecipePage params={params} />
        </>
    )
}

