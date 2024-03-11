
import { clerkClient } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { adminAPIMiddleware } from '../middleware';
import { connectToDatabase } from "@/lib/mongodb";
import { ObjectId } from 'mongodb';

export async function GET(req: any, res: any) {

  await adminAPIMiddleware(req, res);
  let { db } = await connectToDatabase();
  let adminlistsResult = await db
    .collection('adminlists')
    .find().toArray();
  return NextResponse.json(adminlistsResult);
}

export async function POST(req: any, res: any) {

  await adminAPIMiddleware(req, res)
  const users = await clerkClient.users.getUserList();
  return NextResponse.json({
    users: users
  });
}

export async function PUT(req: any, res: any) {

  await adminAPIMiddleware(req, res)
  let { db } = await connectToDatabase();
  const data = await req.json()
  await db
    .collection("adminlists")
    .insertOne(data)
    .then((result: any) => {
      return result.insertedId
    })
  let adminlistsResult = await db
    .collection('adminlists')
    .find().toArray();
  return NextResponse.json(adminlistsResult);
}

export async function DELETE(req: any, res: any) {

  await adminAPIMiddleware(req, res)
  let data = await req.json()
  let { db } = await connectToDatabase();

  let deletingResult = await db.collection('adminlists').findOneAndDelete({ _id: new ObjectId(data.id) })

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