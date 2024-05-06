
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { currentUser } from '@clerk/nextjs';
import { ObjectId } from 'mongodb';
import { jobPostValidation } from '@/util/backend/job-post-validation'

export async function POST(req: any, res: any) {

  let { db } = await connectToDatabase();
  let data = await req.json()
  const user: any = await currentUser();

  data.recruiterId = user.id
  data.isComplete = false

  let { error, errorMessage }: any = jobPostValidation(data, 'info')

  if (error) {
    return NextResponse.json({
      isOkay: !error,
      errorMessage: errorMessage
    });
  }

  if (data._id) {

    let updateData = { $set: {} };

    Object.keys(data).filter((key: any) => key !== "_id").forEach((element: any) => {
      updateData.$set[element] = data[element];
    });

    await db.collection("myjobposts")
      .findOneAndUpdate({ _id: new ObjectId(data._id) }, updateData)
      .then((result: any) => {
      })
      .catch((err: any) => {
        console.log("err", err);
      })

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
    .findOne({ _id: new ObjectId(data._id) });

  return NextResponse.json({
    isOkay: true,
    result: result
  });

}