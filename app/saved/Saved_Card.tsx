"use client"
import RecipeCard from '@/components/card/RecipeCard'
import SavedError from '@/components/error-component/savedError'
import Header from '@/components/header/Header'
import { useRecipeContext } from '@/context/Recipe'
import React from 'react'

export default function Saved_Card() {
  const {savedRecipes} = useRecipeContext()
  return (
    <div className='max-w-7xl mx-auto'>
         <div className='p-4'>
            <h1 className='text-xl lg:text-2xl mt-14 mb-6 font-bold'> { savedRecipes.length !== 0  && <p> Saved recipes </p>}</h1>
            {savedRecipes.length !== 0 ? <RecipeCard data={savedRecipes}/> : <SavedError />}
         </div>
    </div>
  )
}
