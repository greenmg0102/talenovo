
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";

export async function PUT(req: any, res: any) {

  let data = await req.json()
  let { db } = await connectToDatabase();

  let currencyResult = await db
    .collection('currencys')
    .find({ tag: { $regex: new RegExp(data.tagHint, 'i') } })
    .skip(0)
    .limit(5)
    .toArray();

  return NextResponse.json(currencyResult);
}

export async function POST(req: any, res: any) {

  let { db } = await connectToDatabase();
  let data = await req.json()

  await db
    .collection("currencys")
    .insertOne(data)
    .then(async (result: any) => { return })

  let currencyResult = await db
    .collection('currencys')
    .find().toArray();

  return NextResponse.json(currencyResult);
}