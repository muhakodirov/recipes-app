import connectDB from "@/mongodb/mongoConnection";
import { getAllRecipesTag_Type } from "@/utils/api-fetch-functions/Recipes";
import Tag from "@/schemas/Tag";
import { NextResponse } from "next/server";


export async function GET() {
    await connectDB()
    const tags: getAllRecipesTag_Type[] = await Tag.find({})
    return NextResponse.json(tags)
}