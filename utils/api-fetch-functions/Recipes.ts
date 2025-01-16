'use server'
import { Recipe, RecipeResponse } from "../ts-types/recipes"

export async function getAllRecipes({ pageParam }: any): Promise<RecipeResponse> {
    const res = await fetch(`https://dummyjson.com/recipes?limit=${10}&skip=${pageParam}`)
    if (!res.ok) {
        throw new Error(`HTTP-Error! Status: ${res.status}`);
    }
    const json: RecipeResponse = await res.json()
    return json
}

export async function getRecipeById(id: string): Promise<Recipe> {
    const res = await fetch(`https://dummyjson.com/recipes/${id}`)
    if (!res.ok) {
        throw new Error(`So ein Rezept haben wir leider nicht :(`);
    }
    const json: Recipe = await res.json()
    return json
}

export async function getAllRecipesTag(): Promise<string[]> {
    const res = await fetch(`https://dummyjson.com/recipes/tags`)
    if (!res.ok) {
        throw new Error(`HTTP-Error! Status: ${res.status}`);
    }
    const json: string[] = await res.json()
    return json
}

export async function getRecipeByTag(tag: string): Promise<RecipeResponse> {
    const res = await fetch(`https://dummyjson.com/recipes/tag/${tag}`)
    if (!res.ok) {
        throw new Error(`HTTP-Error! Status: ${res.status}`);
    }
    const json: RecipeResponse = await res.json()
    return json
}