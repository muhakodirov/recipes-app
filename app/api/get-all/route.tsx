import Recipe from '@/schemas/Recipe';
import connectDB from '@/mongodb/mongoConnection'
import { NextResponse } from 'next/server';

export async function GET() {
    await connectDB()
    const recipe = await Recipe.find({})
    return NextResponse.json(recipe)
}
