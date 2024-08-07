
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";

export async function POST(req: any, res: any) {

  let { db } = await connectToDatabase();

  const data  =await req.json()
  
  const blogs = await db.collection("tests").find().toArray();
  
  return NextResponse.json({
    users: blogs,
  });
  
}