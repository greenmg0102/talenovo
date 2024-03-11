import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { ObjectId } from 'mongodb';
import { adminAPIMiddleware } from '../../middleware';

export async function DELETE(req: any, res: any) {

  await adminAPIMiddleware(req, res)
  let data = await req.json()
  let { db } = await connectToDatabase();

  let deletingResult = await db.collection('currencys').findOneAndDelete({ _id: new ObjectId(data.id) })

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

  let currencyResult = await db
    .collection('currencys')
    .find()
    .toArray();

  return NextResponse.json(currencyResult);
}

export async function PUT(req: any, res: any) {

  await adminAPIMiddleware(req, res)
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
  await adminAPIMiddleware(req, res)

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