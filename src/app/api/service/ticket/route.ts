
import { NextRequest, NextResponse } from 'next/server'
import { currentUser } from '@clerk/nextjs';
import { connectToDatabase } from "@/lib/mongodb";

export async function POST(req: NextRequest, res: any) {

  let { db } = await connectToDatabase();
  const user: any = await currentUser();

  let data = await req.json()

  const ticketData = {
    userClerkId: user.id,
    userEmail: user.emailAddresses[0].emailAddress,
    message: data.message,
    checkout: false,
  }

  await db
    .collection("tickets")
    .insertOne(ticketData)
    .then((result: any) => { return })

  return NextResponse.json({
    isOkay: true,
    message: "Submitted correctly."   //Submission failed
  });

}