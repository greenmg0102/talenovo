
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";

export async function GET(req: any, res: any) {

  let { db } = await connectToDatabase();
  let locationResult = await db
    .collection('joblocations')
    .find()
    .toArray();

  return NextResponse.json(locationResult);
}

export async function PUT(req: any, res: any) {

  let data = await req.json()

  let { db } = await connectToDatabase();
  let locationResult = await db
    .collection('joblocations')
    .find({ location: { $regex: new RegExp(data.locationHint, 'i') } })
    .skip(0)
    .limit(5)
    .toArray();

  return NextResponse.json(locationResult);
}

export async function POST(req: any, res: any) {

  let { db } = await connectToDatabase();
  let data = await req.json()

  await db
    .collection("joblocations")
    .insertOne(data)
    .then(async (result: any) => { return })

  let locationResult = await db
    .collection('joblocations')
    .find().toArray();

  return NextResponse.json(locationResult);
}