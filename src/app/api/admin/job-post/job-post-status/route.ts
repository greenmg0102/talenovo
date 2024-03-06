
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { currentUser } from '@clerk/nextjs';

export async function GET(req: any, res: any) {

  let result: any = []
  try{
    let { db } = await connectToDatabase();
    const user = await currentUser();

    result = await db
      .collection('myjobposts')
      .findOne({ recruiterId: user.id, isComplete: false });
  } catch (error) {
    console.error(error)
  }
  return NextResponse.json(result);

}