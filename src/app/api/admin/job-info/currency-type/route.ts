
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";

export async function GET(req: any, res: any) {

  let { db } = await connectToDatabase();

  let currencyTypeResult = await db
    .collection('currencytypes')
    .find().toArray();

  return NextResponse.json(currencyTypeResult);
}

export async function POST(req: any, res: any) {

  let { db } = await connectToDatabase();
  let data = await req.json()

  await db
    .collection("currencytypes")
    .insertOne(data)
    .then(async (result: any) => { return })

  let currencyTypeResult = await db
    .collection('currencytypes')
    .find().toArray();

  return NextResponse.json(currencyTypeResult);
}