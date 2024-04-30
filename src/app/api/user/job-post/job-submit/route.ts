
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { currentUser } from '@clerk/nextjs';
import { ObjectId } from 'mongodb';

export async function POST(req: any, res: any) {

  let { db } = await connectToDatabase();

  let data = await req.json()

  const user: any = await currentUser();

  data.recruiterId = user.id

  let updateData = { $set: {} };

  Object.keys(data).filter((key: any) => key !== "_id").forEach((element: any) => {
    updateData.$set[element] = data[element];
  });

  await db.collection("myjobposts").findOneAndUpdate({ _id: new ObjectId(data._id) }, updateData);

  return NextResponse.json({
    isOkay: true
  });

}