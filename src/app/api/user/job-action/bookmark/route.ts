
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { currentUser } from '@clerk/nextjs';

export async function POST(req: any, res: any) {

  const user:any = await currentUser();

  let data = await req.json()
  let { db } = await connectToDatabase();

  let bookmarkdata = {
    userId: user.id,
    jobId: data.jobId
  }

  let isThere = await db
    .collection("bookmarks")
    .findOne({ userId: bookmarkdata.userId, jobId: bookmarkdata.jobId })

  if (isThere === null) {
    let isOkay = await db
      .collection("bookmarks")
      .insertOne(bookmarkdata)
      .then((result: any) => {
        return true
      })
      .catch((erro: any) => {
        return false
      })

    return NextResponse.json({
      isOkay: isOkay,
      message: isOkay ? "Added to Bookmark!" : 'Registration failed'
    });

  } else {
    return NextResponse.json({
      isOkay: true,
      message: "Already registered"
    });
  }



}