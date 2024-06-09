
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import createContract from '@/app/api/mail/util/createContractInList'
import { currentUser } from '@clerk/nextjs';


export async function POST(req: any, res: any) {

  const data:any = await req.json()

  let result = await createContract({
    FirstName: data.FirstName,
    LastName: data.LastName,
    listType: "all clients",
    email: data.email,
  })

  console.log("result", result);

  return NextResponse.json(result);
}


export async function GET(req: any, res: any) {

  let { db } = await connectToDatabase();
  const data = await req.json()
  const user: any = await currentUser();

  let aboutResult = await db.collection('newsletter').findOne({ email: user.email, status: data.status }).then((result: any) => result)


  return NextResponse.json({
    isOkay: true,
  });

}
