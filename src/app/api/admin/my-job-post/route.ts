
import { NextResponse } from "next/server";
import { adminAPIMiddleware } from '../middleware';
import { connectToDatabase } from "@/lib/mongodb";

export async function POST(req: any, res: any) {

  let data = await req.json()

  await adminAPIMiddleware(req, res)

  let { db } = await connectToDatabase();

  const myjobposts = await db.collection("myjobposts")
    .find({ isComplete: false, isComfirm: true })
    .toArray();

  return NextResponse.json({
    myjobposts: myjobposts,
  });

}