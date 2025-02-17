import Recipe from '@/schemas/Recipe';
import connectDB from './../../../mongodb/mongoConnection'
import { NextResponse } from 'next/server';
import { RecipeResponse } from '@/utils/ts-types/recipes';
import { use } from 'react';
import { NextApiRequest } from 'next';

export async function GET(req: NextApiRequest) {
    if (!req.url) {
        return NextResponse.json({ error: "Invalid request URL" }, { status: 400 });
    }
    const { searchParams } = new URL(req.url);
    const skip = parseInt(searchParams.get("skip") || "0");
    await connectDB()
    const total = await Recipe.countDocuments();
    const recipe = await Recipe.find({}).skip(skip).limit(10)
    const data: RecipeResponse = { recipes: recipe, total: total, skip: skip, limit: 10 }
    return NextResponse.json(data)
}
