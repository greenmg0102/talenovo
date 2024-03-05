
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";

export async function GET(req: any, res: any) {

  let { db } = await connectToDatabase();

  let tagResult = await db
    .collection('jobtags')
    .find().toArray();

  return NextResponse.json(tagResult);
}

export async function POST(req: any, res: any) {

  let { db } = await connectToDatabase();
  let data = await req.json()

  await db
    .collection("jobtags")
    .insertOne(data)
    .then(async (result: any) => { return })

  let tagResult = await db
    .collection('jobtags')
    .find().toArray();

  return NextResponse.json(tagResult);
}