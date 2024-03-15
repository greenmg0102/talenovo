
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";

export async function GET(req: any, res: any) {

  let { db } = await connectToDatabase();

  const total = await db.collection("otherjobs").countDocuments();
  const jobList = await db.collection("otherjobs").find().skip(0).limit(50).toArray();

  return NextResponse.json({
    jobList: jobList,
    total: total,
  });

}