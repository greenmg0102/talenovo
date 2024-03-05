
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";


export async function GET(req: any, res: any) {

  let { db } = await connectToDatabase();

  let typeResult = await db
    .collection('jobtypes')
    .find().toArray();

  return NextResponse.json(typeResult);
}

export async function POST(req: any, res: any) {

  let { db } = await connectToDatabase();
  let data = await req.json()

  await db
    .collection("jobtypes")
    .insertOne(data)
    .then(async (result: any) => { return })

  let typeResult = await db
    .collection('jobtypes')
    .find().toArray();

  return NextResponse.json(typeResult);
}