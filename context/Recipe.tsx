'use client'
import { getAll } from '@/utils/api-fetch-functions/Recipes'
import { Recipe } from '@/utils/ts-types/recipes'
import { createContext, useContext, useEffect, useState, Dispatch, SetStateAction } from 'react'

type RecipeContextType = {
    savedRecipes: Recipe[],
    saveRecipe: (obj: Recipe) => void,
    deleteRecipe: (id: any) => void,
    setSavedRecipes: Dispatch<SetStateAction<Recipe[]>>
}

const RecipeContext = createContext<RecipeContextType>({
    savedRecipes: [],
    saveRecipe: () => { },
    deleteRecipe: () => { },
    setSavedRecipes: () => { },
})

export default function RecipeContextProvider({ children }: { children: React.ReactNode }) {
    const [savedRecipes, setSavedRecipes] = useState<Recipe[]>([])

    useEffect(() => {
        const fetchAll = async () => {
            const recipes = JSON.parse(localStorage.getItem("recipes") || "[]");
            const res = await getAll()
            const newObj = res.filter(recipe => recipes.includes(recipe.id));
            setSavedRecipes(newObj)
        }
        fetchAll()
    }, [])

    const saveRecipe = (obj: Recipe) => {
        const isExist = savedRecipes.some(recipe => recipe.id == obj.id)

        if (!isExist) {
            const recipes = JSON.parse(localStorage.getItem("recipes") || "[]");
            setSavedRecipes((prev) => [...prev, obj])
            if (!recipes.includes(obj.id)) {
                recipes.push(obj.id)
                localStorage.setItem('recipes', JSON.stringify(recipes))
            }
        }
    }

    const deleteRecipe = (id: any) => {
        const recipes = JSON.parse(localStorage.getItem("recipes") || "[]");
        const newObj = savedRecipes.filter(el => el.id !== id)
        const updRecipes = recipes?.filter((el: any) => el !== id)

        setSavedRecipes(newObj)
        localStorage.setItem('recipes', JSON.stringify(updRecipes))

    }

    return (
        <RecipeContext.Provider value={{ savedRecipes, setSavedRecipes, saveRecipe, deleteRecipe }}>
            {children}
        </RecipeContext.Provider>
    )
}



export function useRecipeContext() {
    return useContext(RecipeContext);
}