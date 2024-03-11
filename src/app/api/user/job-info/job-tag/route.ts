
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";

export async function PUT(req: any, res: any) {

  let data = await req.json()
  let { db } = await connectToDatabase();

  let currencyResult = await db
    .collection('jobtags')
    .find({ tag: { $regex: new RegExp(data.tagHint, 'i') } })
    .skip(0)
    .limit(5)
    .toArray();

  return NextResponse.json(currencyResult);
}
