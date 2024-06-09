
import { NextResponse } from "next/server";
// import { connectToDatabase } from "@/lib/mongodb";
// import { currentUser } from '@clerk/nextjs';
// import { ObjectId } from "mongodb";

export async function POST(req: any, res: any) {

  // let { db } = await connectToDatabase();
  // const user:any = await currentUser();
  // const data = await req.json()

  // const myjobapply = await db.collection("bookmarks")
  //   .find({ userId: user.id })
  //   .toArray();

  // let real = myjobapply.map((item: any, index: any) => item.jobId)

  // const query = { _id: { $in: real.map(id => new ObjectId(id)) } };
  // const result = await db.collection("otherjobs").find(query).toArray();

  return NextResponse.json({
    result: [],
  });

}