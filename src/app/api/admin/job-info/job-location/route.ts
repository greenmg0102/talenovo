
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { ObjectId } from 'mongodb';
import { adminAPIMiddleware } from '../../middleware';


export async function PUT(req: any, res: any) {

  await adminAPIMiddleware(req, res)
  let data = await req.json()
  let { db } = await connectToDatabase();

  let deletingResult = await db.collection('joblocations').updateOne(
    { _id: new ObjectId(data.id) },
    { $set: { location: data.location } }
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

export async function DELETE(req: any, res: any) {

  await adminAPIMiddleware(req, res)
  let data = await req.json()
  let { db } = await connectToDatabase();

  let deletingResult = await db.collection('joblocations').findOneAndDelete({ _id: new ObjectId(data.id) })

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

  await adminAPIMiddleware(req, res)
  let { db } = await connectToDatabase();
  let locationResult = await db
    .collection('joblocations')
    .find()
    .toArray();

  return NextResponse.json(locationResult);
}

export async function POST(req: any, res: any) {

  await adminAPIMiddleware(req, res)
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