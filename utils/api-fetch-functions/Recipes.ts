'use server'
import { Recipe, RecipeResponse } from "../ts-types/recipes"

export async function getAllRecipes({ pageParam }: any): Promise<RecipeResponse> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/get-recipes?limit=${10}&skip=${pageParam}`)
    if (!res.ok) {
        throw new Error(`HTTP-Error! Status: ${res.status}`);
    }
    const json: RecipeResponse = await res.json()
    return json
}

export async function getAll(): Promise<Recipe[]> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/get-all`)
    if (!res.ok) {
        throw new Error(`HTTP-Error! Status: ${res.status}`);
    }
    const json: Recipe[] = await res.json()
    return json
}

export async function getRecipeById(id: string): Promise<Recipe> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/get-recipes/${id}`)
    if (!res.ok) {
        throw new Error(`So ein Rezept haben wir leider nicht :(`);
    }
    const json: Recipe = await res.json()
    return json
}

export type getAllRecipesTag_Type = {
    _id: string
    tag: string
}
export async function getAllRecipesTag(): Promise<getAllRecipesTag_Type[]> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`)
    if (!res.ok) {
        throw new Error(`HTTP-Error! Status: ${res.status}`);
    }
    const json: getAllRecipesTag_Type[] = await res.json()
    return json
}

export async function getRecipeByTag(tag: string): Promise<Recipe[]> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories/${tag}`)
    if (!res.ok) {
        throw new Error(`HTTP-Error! Status: ${res.status}`);
    }
    const json: Recipe[] = await res.json()
    return json
}

export async function getRecipeByUserId(userId: string): Promise<Recipe[]> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/get-by-userid/${userId}`)
    if (!res.ok) {
        throw new Error(`HTTP-Error! Status: ${res.status}`);
    }
    const json: Recipe[] = await res.json()
    return json
}
