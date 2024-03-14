
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { adminAPIMiddleware } from '@/app/api/admin/middleware';

export async function GET(req: any, res: any) {

  await adminAPIMiddleware(req, res)
  let { db } = await connectToDatabase();

  const data = await req.json()

  const blogs = await db.collection("tests").find().toArray();

  return NextResponse.json({
    users: blogs,
  });

}