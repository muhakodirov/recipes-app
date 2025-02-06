import Recipe from '@/schemas/Recipe.js';
import connectDB from '@/mongodb/mongoConnection'
import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';

type Params = {
    params: {
        id: string
    }
}

export async function GET(req: NextApiRequest, { params }: Params) {
    await connectDB()
    const result = await params
    const id = parseInt(result.id)
    const recipe = await Recipe.findOne({ id: id })
    return NextResponse.json(recipe)
}