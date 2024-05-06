
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { currentUser } from '@clerk/nextjs';

export async function POST(req: any, res: any) {

  let { db } = await connectToDatabase();
  const user: any = await currentUser();
  const data = await req.json()

  const myjobposts = await db.collection("myjobposts")
    .find({ recruiterId: user.id, postStatus: { $in: [1, 2] } })
    .sort({ _id: -1 })
    .toArray();

  return NextResponse.json({
    myjobposts: myjobposts,
  });

}