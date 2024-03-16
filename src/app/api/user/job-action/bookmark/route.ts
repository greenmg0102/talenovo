
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { currentUser } from '@clerk/nextjs';

export async function POST(req: any, res: any) {

  const user = await currentUser();

  let data = await req.json()
  let { db } = await connectToDatabase();

  let bookmarkdata = {
    userId: user.id,
    jobId: data.id
  }

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
    isOkay: isOkay
  });
  
}