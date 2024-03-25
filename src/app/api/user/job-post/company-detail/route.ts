
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { currentUser } from '@clerk/nextjs';

export async function POST(req: any, res: any) {

  let { db } = await connectToDatabase();
  let data = await req.json()
  const user = await currentUser();

  data.recruiterId = user.id
  data.isComplete = false

  if (data._id) {

    let updateData = { $set: {} };

    Object.keys(data).filter((key: any) => key !== "_id").forEach((element: any) => {
      updateData.$set[element] = data[element];
    });

    await db.collection("myjobposts").findOneAndUpdate({ _id: data._id }, updateData);

  } else {
    await db
      .collection("myjobposts")
      .insertOne(data)
      .then((result: any) => {
        return result.insertedId
      })
  }

  let result = await db
    .collection('myjobposts')
    .findOne({ recruiterId: user.id, isComplete: false });

  return NextResponse.json(result);

}