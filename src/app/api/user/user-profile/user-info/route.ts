
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
      avatar: user.imageUrl,
      name: (user.firstName === null ? "" : user.firstName) + (user.lastName === null ? "" : user.lastName),
      mail: user.emailAddresses,
      phone: user.phoneNumbers,
      profile: "",
      jobTitle: "",
      summary: "",

      birthday: "",
      experience: 0,
      ctc: 0,

      locatedin: "checking on",
      gender: "",
      postedJob: myjobpostCount,
      appliedJob: 0,
      bookmark: mybookmarkjobCount,
      viewed: []
    });

  } else {
    return NextResponse.json({
      avatar: isMe.avatar,
      name: (user.firstName === null ? "" : user.firstName) + (user.lastName === null ? "" : user.lastName),
      mail: user.emailAddresses,
      phone: user.phoneNumbers,
      profile: isMe.profile,
      jobTitle: isMe.jobTitle,
      summary: isMe.summary,

      birthday: isMe.birthday,
      experience: isMe.experience,
      ctc: isMe.ctc,

      locatedin: isMe.locatedin,
      gender: isMe.gender,
      postedJob: myjobpostCount,
      appliedJob: 0,
      bookmark: mybookmarkjobCount,
      viewed: []
    });
  }
}