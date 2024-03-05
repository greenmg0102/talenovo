
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { currentUser } from '@clerk/nextjs';

export async function POST(req: any, res: any) {

  let insertedId = null
  let { db } = await connectToDatabase();

  let data = await req.json()
  const user = await currentUser();

  let isExist = await db
    .collection("ourjobs")
    .findOne({ _id: data._id, recruiterId: user.id })
    .then((result: any) => {
      if (result !== null) {
        return result
      } else {
        return undefined
      }
    })

  if (isExist !== undefined) {

    let buffer = { ...data, ...isExist }
    insertedId = await db
      .collection("ourjobs")
      .insertOne(buffer)
      .then((result: any) => {
        return result.insertedId
      })

  } else {

    data.recruiterId = user.id
    insertedId = await db
      .collection("ourjobs")
      .insertOne(data)
      .then((result: any) => {
        return result.insertedId
      })

  }


  let result = await db
    .collection('ourjobs')
    .findOne({ _id: insertedId });

  return NextResponse.json(result);

}