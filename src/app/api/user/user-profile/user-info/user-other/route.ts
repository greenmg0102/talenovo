
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { currentUser } from '@clerk/nextjs';

export async function POST(req: any, res: any) {

  let { db } = await connectToDatabase();
  const user:any = await currentUser();
  let reqData = await req.json()

  let isMe:any = await db.collection("userinfos").findOne({ userId: user.id });

  if (isMe === null) {
    const data = {
      userId: user.id,
      profile: "",
      jobTitle: "",
      summary: "",
      skill: [],

      birthday: reqData.birthday,
      experience: reqData.experience,
      ctc: reqData.ctc,

      avatar: "",
      gender: reqData.gender,
      locatedin: reqData.locatedin,
      postedJob: 0,
      appliedJob: 0,
      bookmark: 0,
      viewed: []
    };
    await db.collection("userinfos").insertOne(data);
    return NextResponse.json({
      isOkay: true,
    });

  } else {
    let updateData = { $set: {} };
    Object.keys(isMe).filter((key: any) => key !== "_id").forEach((element: any) => {
      updateData.$set[element] = isMe[element];
    });
    updateData.$set["birthday"] = reqData.birthday;
    updateData.$set["experience"] = reqData.experience;
    updateData.$set["ctc"] = reqData.ctc;
    
    await db.collection("userinfos").findOneAndUpdate({ _id: isMe._id }, updateData);
    return NextResponse.json({
      isOkay: true,
    });
  }

}