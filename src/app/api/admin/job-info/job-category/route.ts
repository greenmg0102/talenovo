
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";


export async function GET(req: any, res: any) {

  let { db } = await connectToDatabase();

  let categoryResult = await db
    .collection('jobcategorys')
    .find().toArray();

  return NextResponse.json(categoryResult);
}

export async function POST(req: any, res: any) {

  let { db } = await connectToDatabase();
  let data = await req.json()

  await db
    .collection("jobcategorys")
    .insertOne(data)
    .then(async (result: any) => { return })

  let categoryResult = await db
    .collection('jobcategorys')
    .find().toArray();

  return NextResponse.json(categoryResult);
}