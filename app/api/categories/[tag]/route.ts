import Recipe from '@/schemas/Recipe';
import connectDB from '@/mongodb/mongoConnection';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ tag: string }> }
): Promise<NextResponse> {
  await connectDB();
  
  const { tag } = await params;
  const formattedStr: string = tag.charAt(0).toUpperCase() + tag.slice(1).toLowerCase();
  

    const recipes = await Recipe.find({ tags: { $in: [formattedStr] } });
    return NextResponse.json(recipes);

}