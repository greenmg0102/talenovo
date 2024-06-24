
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { currentUser } from '@clerk/nextjs';
import { userInfoValidation } from '@/util/backend/user-info-validation'

export async function POST(req: any, res: any) {

  let { db } = await connectToDatabase();
  const user: any = await currentUser();
  let reqData: any = await req.json()

  let isMe: any = await db.collection("userinfos").findOne({ userId: user.id });
  

  let { error, errorMessage }: any = userInfoValidation(reqData)

  if (error) {
    return NextResponse.json({
      isOkay: !error,
      errorMessage: errorMessage
    });
  }

  if (isMe === null) {


    const data = {
      avatar: reqData.avatar,
      userId: user.id,
      name: (user.firstName === null ? "" : user.firstName) + " " + (user.lastName === null ? "" : user.lastName),
      profile: reqData.profile,
      jobTitle: reqData.jobTitle,
      summary: reqData.summary,
      skill: reqData.skill,
      gender: "",
      locatedin: "",
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
    updateData.$set["profile"] = reqData.profile;
    updateData.$set["jobTitle"] = reqData.jobTitle;
    updateData.$set["summary"] = reqData.summary;
    updateData.$set["avatar"] = reqData.avatar;
    updateData.$set["skill"] = reqData.skill;

    await db.collection("userinfos").findOneAndUpdate({ _id: isMe._id }, updateData);
    return NextResponse.json({
      isOkay: true,
    });
  }

}