"use server"
import connectDB from "@/mongodb/mongoConnection"
import { formSchema } from "@/schemas/FormSchema-Zod"
import * as z from "zod"
import Recipe from "@/schemas/Recipe";
import { redirect } from "next/navigation";
import randomId from "@/utils/random";

export default async function create(values: z.infer<typeof formSchema>, userId: string): Promise<{
    ok: boolean;
    message: string;
}|void> {
    
    const ingredients = values.ingredients.split('\n')
    const instructions = values.instructions.split('\n')
    const tags = values.tags.split(',')
    let id:number = randomId()


    await connectDB();
    const res = await new Recipe({
        id: id,
        name: values.name,
        ingredients: ingredients,
        instructions: instructions,
        prepTimeMinutes: values.prepTimeMinutes,
        cookTimeMinutes: values.cookTimeMinutes,
        servings: values.servings,
        difficulty: values.difficulty,
        cuisine: values.cuisine,
        caloriesPerServing: values.calories,
        tags: tags,
        userId: userId,
        image: values.image,
        rating: 10,
        reviewCount: 15,
        mealType: values.mealType
    }).save()
    
    if(!res){
        return {ok: false, message: 'Error!'}
    }
    redirect(`/recipes/${(res.id).toString()}`)
        

}