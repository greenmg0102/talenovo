
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function POST(req: any, res: any) {

  let data = await req.json()
  let { db } = await connectToDatabase();

  let jobDetailResult = await db
    .collection('otherjobs')
    .findOne({ _id: new ObjectId(data.id) })

  return NextResponse.json(jobDetailResult);
}