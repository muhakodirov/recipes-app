import Recipe from '@/schemas/Recipe.js';
import connectDB from '@/mongodb/mongoConnection'
import { NextResponse, NextRequest } from 'next/server';


export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    await connectDB()
    const result = await params
    const id = parseInt(result.id)
    const recipe = await Recipe.findOne({ id: id })
    return NextResponse.json(recipe)
}