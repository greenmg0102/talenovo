
import axios from 'axios';

const host = 'https://ms-1dd1c86bf47e-9385.nyc.meilisearch.io';
const apiKey = 'e6c3cf035914f999bc89bdc1c13aa1bcfb930fb2';
const indexName = 'title';

import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { currentUser } from '@clerk/nextjs';

export async function GET(req: any, res: any) {

  let { db } = await connectToDatabase();
  const user: any = await currentUser();

  const myJobAlert = await db.collection("jobalerts")
    .find({ userId: user.id, checked: false })
    .toArray();

  let meilieaserchIdList: any = myJobAlert.map((item: any) => item.jobId)

  //here is your code
  const response = await axios.post(`${host}/indexes/${indexName}/search`, {
    q: "",
    filter: meilieaserchIdList.map((jobId: string) => `jobId = ${jobId}`).join(" OR ")
  }, {
    headers: { 'Authorization': `Bearer ${apiKey}` }
  });

  const matchedData = response.data.hits;

  return NextResponse.json({
    isOkay: true,
    result: matchedData
  });

}