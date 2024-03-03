
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";

export async function POST(req: any, res: any) {

  let { db } = await connectToDatabase();

  const data = await req.json()

  let result = await db
    .collection("ourjobs")
    .insertOne(data)
    .then((result: any) => {
      console.log("result11", result);
    })

  console.log("result", result);

  return NextResponse.json({
    users: data
  });

}