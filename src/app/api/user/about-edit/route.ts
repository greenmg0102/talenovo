
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";

export async function POST(req: any, res: any) {

  let { db } = await connectToDatabase();
  const data = await req.json()

  let aboutResult = await db.collection("about").findOne({ type: data.type });

  return NextResponse.json({
    isOkay: true,
    result: aboutResult
  });

}
