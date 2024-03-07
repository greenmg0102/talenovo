
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { currentUser } from '@clerk/nextjs';

export async function GET(req: any, res: any) {

    let { db } = await connectToDatabase();
    const user = await currentUser();

    let result = await db
      .collection('myjobposts')
      .findOne({ recruiterId: user.id, isComplete: false });

  return NextResponse.json(result);

}