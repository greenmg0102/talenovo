
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { currentUser } from '@clerk/nextjs';

export async function POST(req: any, res: any) {

  let { db } = await connectToDatabase();
  let data = await req.json()
  const user = await currentUser();

  data.recruiterId = user.id

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