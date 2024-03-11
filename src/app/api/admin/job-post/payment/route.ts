
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { adminAPIMiddleware } from '../../middleware';


export async function POST(req: any, res: any) {

  await adminAPIMiddleware(req, res)
  let { db } = await connectToDatabase();

  const data = await req.json()

  let insertedId = await db
    .collection("ourjobs")
    .insertOne(data)
    .then((result: any) => {
      return result.insertedId
    })

  let result = await db
    .collection('ourjobs')
    .findOne({ _id: insertedId });

  return NextResponse.json(result);

}