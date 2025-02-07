import Recipe from '@/schemas/Recipe';
import connectDB from '@/mongodb/mongoConnection'
import { NextResponse } from 'next/server';
import { NextApiRequest } from 'next';

export async function GET(req: NextApiRequest) {
    await connectDB()
    const recipe = await Recipe.find({})
    return NextResponse.json(recipe)
}
