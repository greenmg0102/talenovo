
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { adminAPIMiddleware } from '../../middleware';


export async function GET(req: any, res: any) {

  await adminAPIMiddleware(req, res)
  let { db } = await connectToDatabase();

  let productionResult = await db
    .collection('jobproductions')
    .find().toArray();

  return NextResponse.json(productionResult);
}

export async function POST(req: any, res: any) {

  await adminAPIMiddleware(req, res)
  let { db } = await connectToDatabase();
  let data = await req.json()

  await db
    .collection("jobproductions")
    .insertOne(data)
    .then(async (result: any) => { return })

  let productionResult = await db
    .collection('jobproductions')
    .find().toArray();

  return NextResponse.json(productionResult);
}