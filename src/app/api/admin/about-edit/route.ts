
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { adminAPIMiddleware } from '../middleware';

export async function POST(req: any, res: any) {

  await adminAPIMiddleware(req, res)
  let { db } = await connectToDatabase();

  const data = await req.json()

  let aboutResult = await db.collection('about').findOne({ type: data.type }).then((result: any) => result)

  if (aboutResult !== null) {

    let updateData = { $set: {} };

    Object.keys(data).filter((key: any) => key !== "_id").forEach((element: any) => {
      updateData.$set[element] = data[element];
    });

    await db.collection("about").findOneAndUpdate({ type: data.type }, updateData);

  } else {
    await db
      .collection("about")
      .insertOne(data)
      .then(async (result: any) => { return })
  }

  let aboutReadResult = await db.collection('about').find().toArray()

  return NextResponse.json({
    isOkay: true,
    result: aboutReadResult
  });

}

export async function GET(req: any, res: any) {

  await adminAPIMiddleware(req, res)
  let { db } = await connectToDatabase();

  let aboutResult = await db.collection('about').find().toArray()

  return NextResponse.json({
    isOkay: true,
    result: aboutResult
  });

}