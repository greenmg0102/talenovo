
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { currentUser } from '@clerk/nextjs';

export async function GET(req: any, res: any) {
  try {
    let { db } = await connectToDatabase();
    const user = await currentUser();

    let result = await db
      .collection('myjobposts')
      .findOne({ recruiterId: user.id, isComplete: false });

    res.status(200).json(result);
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).json({ error: "An error occurred while processing the request" });
  }

}