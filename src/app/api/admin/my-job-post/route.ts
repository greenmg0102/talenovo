
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { adminAPIMiddleware } from '../middleware';


export async function POST(req: any, res: any) {

  await adminAPIMiddleware(req, res)
  let { db } = await connectToDatabase();

  const data = await req.json()

  const myjobposts = await db.collection("myjobposts")
    .find({ isComplete: false, isComfirm: true })
    .toArray();

  return NextResponse.json({
    myjobposts: myjobposts,
  });

}