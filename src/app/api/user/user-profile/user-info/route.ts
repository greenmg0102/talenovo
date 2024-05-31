
import { connectToDatabase } from "@/lib/mongodb";
import { currentUser } from '@clerk/nextjs';
import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest, res: NextResponse) {

  const user: any = await currentUser();
  let { db } = await connectToDatabase();
  let reqData = await req.json()


  let isMe: any = await db.collection("userinfos").findOne({ userId: user.id });

  let updateData = { $set: {} };
    Object.keys(isMe).filter((key: any) => key !== "_id").forEach((element: any) => {
      updateData.$set[element] = isMe[element];
    });
    updateData.$set["locatedin"] = reqData.locatedin;


  let result = await db.collection("userinfos").findOneAndUpdate({ _id: isMe._id }, updateData).then((res: any) => { return res });
  return NextResponse.json({
    isOkay: true,
    result: result
  });
}

export async function GET(req: NextRequest, res: NextResponse) {

  const ip = (req.headers.get('x-forwarded-for') ?? '127.0.0.1').split(',')[0]
  const localInfo: any = await axios.get(`https://api.findip.net/${ip === "::1" ? "8.230.6.196" : ip}/?token=988e48d25e534484b591149ce6a32c74`);

  let { db } = await connectToDatabase();
  const user: any = await currentUser();

  let isMe = await db.collection("userinfos").findOne({ userId: user.id });

  let myjobpostCount = await db.collection("myjobposts").countDocuments({ recruiterId: user.id, isComplete: false, isComfirm: false });
  let mybookmarkjobCount = await db.collection("bookmarks").countDocuments({ userId: user.id });
  let mybookmarkjob = []

  if (isMe === null) {

    return NextResponse.json({
      avatar: user.imageUrl,
      name: (user.firstName === null ? "" : user.firstName) + " " + (user.lastName === null ? "" : user.lastName),
      mail: user.emailAddresses,
      phone: user.phoneNumbers,
      profile: "",
      jobTitle: "",
      summary: "",
      skill: [],
      mybookmarkjob: [],
      birthday: "",
      experience: 0,
      ctc: 0,

      locatedin: localInfo.data.city.names.en + ", " + localInfo.data.country.names.en,
      gender: "",
      postedJob: myjobpostCount,
      appliedJob: 0,
      bookmark: mybookmarkjobCount,
      viewed: []
    });

  } else {

    console.log("!@#$%", isMe);

    return NextResponse.json({
      avatar: isMe.avatar,
      name: (user.firstName === null ? "" : user.firstName) + " " + (user.lastName === null ? "" : user.lastName),
      mail: user.emailAddresses,
      phone: user.phoneNumbers,
      profile: isMe.profile,
      jobTitle: isMe.jobTitle,
      summary: isMe.summary,

      mybookmarkjob: mybookmarkjob,
      skill: isMe.skill,
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