
import { NextResponse } from "next/server";
import { adminAPIMiddleware } from '../middleware';
import { connectToDatabase } from "@/lib/mongodb";

export async function POST(req: any, res: any) {

  await adminAPIMiddleware(req, res)

  let { db } = await connectToDatabase();

  const myjobposts = await db.collection("myjobposts")
    .find({ postStatus: 1 })
    .toArray();

  return NextResponse.json({
    myjobposts: myjobposts,
  });

}

export async function PUT(req: any, res: any) {

  await adminAPIMiddleware(req, res)
  
  let { db } = await connectToDatabase();

  let data = await req.json()
  
  console.log("PUT", data);

  const myjobposts = await db.collection("myjobposts")
    .find({ postStatus: 1 })
    .toArray();

  return NextResponse.json({
    myjobposts: myjobposts,
  });

}