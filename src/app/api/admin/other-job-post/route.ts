
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { adminAPIMiddleware } from '../middleware';

export async function POST(req: any, res: any) {

  await adminAPIMiddleware(req, res)
  let { db } = await connectToDatabase();

  const data  =await req.json()
  
  const blogs = await db.collection("tests").find().toArray();
  
  console.log("data", data)
  console.log("blogs", blogs)

  return NextResponse.json({
    users: blogs,
  });
  
}