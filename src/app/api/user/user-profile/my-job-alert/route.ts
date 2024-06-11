
import axios from 'axios';

const host = 'https://ms-ce7a48ac689b-10562.nyc.meilisearch.io/';
const apiKey = '9fbe0270ada537d37c34e0f768ceed9fe2ae3b6b';
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

  console.log("meilieaserchIdList", meilieaserchIdList);


  //here is your code
  const response: any = meilieaserchIdList.length === 0 ? [] : await axios.post(`${host}/indexes/${indexName}/search`, {
    q: "",
    filter: meilieaserchIdList.map((jobId: string) => `jobId = ${jobId}`).join(" OR ")
  }, {
    headers: { 'Authorization': `Bearer ${apiKey}` }
  });

  const matchedData = response.length === 0 ? [] : response.data.hits;

  return NextResponse.json({
    isOkay: true,
    result: matchedData
  });

}