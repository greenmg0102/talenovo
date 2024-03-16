
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { currentUser } from '@clerk/nextjs';

export async function GET(req: any, res: any) {

  let { db } = await connectToDatabase();
  const user = await currentUser();

  let isMe = await db.collection("userinfos").findOne({ userId: user.id });

  let myjobpostCount = await db.collection("myjobposts").countDocuments({ recruiterId: user.id, isComplete: false, isComfirm: false });
  let mybookmarkjobCount = await db.collection("bookmarks").countDocuments({ userId: user.id });

  if (isMe === null) {
    return NextResponse.json({
      mail: user.emailAddresses,
      phone: user.phoneNumbers,
      profile: "",
      locatedin: "",
      gender: "",
      postedJob: myjobpostCount,
      appliedJob: 0,
      bookmark: mybookmarkjobCount,
      viewed: []
    });
  } else {
    return NextResponse.json({
      mail: user.emailAddresses,
      phone: user.phoneNumbers,
      profile: isMe.profile,
      locatedin: isMe.locatedin,
      gender: isMe.gender,
      postedJob: myjobpostCount,
      appliedJob: 0,
      bookmark: mybookmarkjobCount,
      viewed: []
    });
  }
}