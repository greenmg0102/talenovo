
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { adminAPIMiddleware } from '../middleware';

export async function GET(req: any, res: any) {

  await adminAPIMiddleware(req, res)
  let { db } = await connectToDatabase();

  const subscriptionList = await db.collection("users").find().toArray();

  console.log("subscriptionList", subscriptionList);


  return NextResponse.json({
    subscriptionList: subscriptionList,
  });

}