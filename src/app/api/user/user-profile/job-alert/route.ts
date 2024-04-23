
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { currentUser } from '@clerk/nextjs';

export async function POST(req: any, res: any) {

  let { db } = await connectToDatabase();
  const user: any = await currentUser();
  let reqData = await req.json()

  let isMe: any = await db.collection("userinfos").findOne({ userId: user.id });

  let updateData = { $set: {} };

  Object.keys(isMe).filter((key: any) => key !== "_id").forEach((element: any) => {
    updateData.$set[element] = isMe[element];
  });

  updateData.$set["jobalertsetting"] = reqData;
  await db.collection("userinfos").findOneAndUpdate({ _id: isMe._id }, updateData);

  return NextResponse.json({
    isOkay: true,
  });

}