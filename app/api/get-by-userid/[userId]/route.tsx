import Recipe from '@/schemas/Recipe';
import connectDB from '@/mongodb/mongoConnection'
import { NextRequest, NextResponse } from 'next/server';


export async function GET(request: NextRequest, { params }: { params: Promise<{ userId: string }> }) {
    await connectDB()
    const { userId } = await params;
    const recipe = await Recipe.find({ userId: `${userId}` })
    return NextResponse.json(recipe)
}
