
import axios from 'axios';

const host = 'https://ms-7b38c9a53bf5-9766.lon.meilisearch.io';
const apiKey = 'a9120440eb9dce6256f824577056a48700be88f0';
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