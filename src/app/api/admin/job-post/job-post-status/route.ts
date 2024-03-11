
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { currentUser } from '@clerk/nextjs';
import { adminAPIMiddleware } from '../../middleware';


export async function GET(req: any, res: any) {

  await adminAPIMiddleware(req, res)
    let { db } = await connectToDatabase();
    const user = await currentUser();

    let result = await db
      .collection('myjobposts')
      .findOne({ recruiterId: user.id, isComplete: false });

  return NextResponse.json(result);

}