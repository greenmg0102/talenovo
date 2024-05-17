
import { connectToDatabase } from "@/lib/mongodb";
import { currentUser } from '@clerk/nextjs';
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest, res: NextResponse) {

  let { db } = await connectToDatabase();
  const user: any = await currentUser();

  console.log("user.id", user.id);
  

  if (user) {
    let isMe = await db.collection("users").findOne({ clerkId: user.id });

    return NextResponse.json(isMe)
  } else {
    return NextResponse.json(null)
  }

}