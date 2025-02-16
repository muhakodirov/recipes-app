"use client"

import Header from "@/components/header/Header";
// import { useEffect } from "react";
// import { getAll } from "@/utils/api-fetch-functions/Recipes"
// import { useRecipeContext } from "@/context/Recipe";

export default function SavedLayout({ children, }: { children: React.ReactNode; }) {
  // const {setSavedRecipes} = useRecipeContext()
  // useEffect( () => {
  //   const recipes = JSON.parse(localStorage.getItem("recipes") || "[]");
  //   if (recipes.length === 0) return;
  //   const fetchAllRecipes = async () => {
  //     const datas = await getAll()
  //     if (datas) {
  //         const updRecipes = datas?.filter((el) => recipes.includes(el.id)) || []
  //         setSavedRecipes(updRecipes)
  //     } else {
  //         setSavedRecipes([])
  //     }
  //   }
  //   fetchAllRecipes()

  // }, [])


  return (
    <>
      <Header />
      {children}
    </>
  );
}
