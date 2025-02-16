import Recipe from '@/schemas/Recipe';
import connectDB from '@/mongodb/mongoConnection'
import { NextResponse } from 'next/server';
import { NextApiRequest } from 'next';

type Params = {
    params: {
        userId: string
    }
}
export async function GET(req: NextApiRequest, { params }: Params) {
    await connectDB()
    const result = await params
    const id = parseInt(result.userId)
    const recipe = await Recipe.find({ userId: id })
    return NextResponse.json(recipe)
}
