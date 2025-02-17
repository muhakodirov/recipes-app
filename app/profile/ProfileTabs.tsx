"use client"

import { useEffect, useState } from "react"
import { Grid, Bookmark, Loader2 } from "lucide-react"
import Card from "./Card"
import { useUserContext } from "@/context/User";
import { getRecipeByUserId } from "@/utils/api-fetch-functions/Recipes";
import { Recipe } from "@/utils/ts-types/recipes";
import { useRecipeContext } from "@/context/Recipe";

export default function ProfileTabs() {
    const { currUser, setCurrUser } = useUserContext()
    const { savedRecipes } = useRecipeContext()
    const [activeTab, setActiveTab] = useState("posts")
    const [data, setData] = useState<Recipe[]>([])
    const [loading, setLoading] = useState<boolean>(false)


    useEffect(()=>{
        setLoading(true)
        const fetchData = async () => {
            const obj = await getRecipeByUserId(currUser?.id)
            setData(obj)
            setLoading(false)
        }
        fetchData()
    }, [])



    const handleTabs = async (tab: string) => {
        setActiveTab(tab)
        setLoading(true)

        switch (tab) {

            case 'posts':
                // fetch datas from db that are related or created from this user
                if (currUser) {
                    const obj = await getRecipeByUserId(currUser?.id)
                    setData(obj)
                    setLoading(false)
                } else {
                    setData([])
                    setLoading(false)
                }
                break;
            case 'saved':
                setData(savedRecipes)
                setLoading(false)
                break
        }
    }




    return (
        <>
            <div className="border-t border-gray-200 mb-8">
                <div className="flex justify-center">
                    <button
                        className={`flex items-center px-4 py-2 ${activeTab === "posts" ? "border-t-2 border-black" : ""}`}
                        onClick={() => handleTabs("posts")}
                    >
                        <Grid className="w-4 h-4 mr-2" />
                        Posts
                    </button>
                    <button
                        className={`flex items-center px-4 py-2 ${activeTab === "saved" ? "border-t-2 border-black" : ""}`}
                        onClick={() => handleTabs("saved")}
                    >
                        <Bookmark className="w-4 h-4 mr-2" />
                        Saved
                    </button>
                </div>
            </div>
            <div className="p-4 w-full md:w-[60%] mx-auto">
                {loading ? <Loader2 className="mx-auto mt-7 animate-spin size-20" /> : <Card data={data} />}

            </div>
        </>
    )
}
