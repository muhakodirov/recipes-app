import Recipe from '@/schemas/Recipe';
import connectDB from '@/mongodb/mongoConnection';
import { NextApiRequest } from 'next';
import { NextResponse } from 'next/server';


export async function GET(req: NextApiRequest, { params }: { params: { tag: string } }) {
    await connectDB()
    const result = await params
    const tag = result.tag
    const formattedStr = tag.charAt(0).toUpperCase() + tag.slice(1).toLowerCase();
    const recipe = await Recipe.find({ tags: { $in: [formattedStr] } })
    // console.log(recipe)
    return NextResponse.json(recipe)
}