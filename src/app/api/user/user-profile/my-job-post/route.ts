
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { currentUser } from '@clerk/nextjs';

export async function POST(req: any, res: any) {

  let { db } = await connectToDatabase();
  const user = await currentUser();
  const data = await req.json()

  const myjobposts = await db.collection("myjobposts")
    .find({ recruiterId: user.id, isComplete: false, isComfirm: false })
    .toArray();

  return NextResponse.json({
    myjobposts: myjobposts,
  });

}