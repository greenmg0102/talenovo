
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { ObjectId } from 'mongodb';

export async function DELETE(req: any, res: any) {

  let data = await req.json()
  let { db } = await connectToDatabase();

  let deletingResult = await db.collection('jobtypes').findOneAndDelete({ _id: new ObjectId(data.id) })

  if (deletingResult === null) {
    return NextResponse.json({
      result: false,
      message: "Document not found for deletion"
    });
  } else {
    return NextResponse.json({
      result: true
    });
  }
}

export async function PUT(req: any, res: any) {

  let data = await req.json()
  let { db } = await connectToDatabase();

  let deletingResult = await db.collection('jobtypes').updateOne(
    { _id: new ObjectId(data.id) },
    { $set: { type: data.type } }
  );

  if (deletingResult === null) {
    return NextResponse.json({
      result: false,
      message: "Document not found for deletion"
    });
  } else {
    return NextResponse.json({
      result: true
    });
  }
}

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