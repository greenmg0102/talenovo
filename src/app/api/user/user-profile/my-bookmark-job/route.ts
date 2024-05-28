
import axios from 'axios';

const host = 'https://ms-f818396405c0-10172.nyc.meilisearch.io/';
const apiKey = '1116d49cd6e2aee89e3b54713b1bb9b1e4184651';
const indexName = 'title';

import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { currentUser } from '@clerk/nextjs';

export async function GET(req: any, res: any) {

  let { db } = await connectToDatabase();
  const user: any = await currentUser();

  const myJobAlert = await db.collection("bookmarks")
    .find({ userId: user.id })
    .toArray();

  let meilieaserchIdList: any = myJobAlert.map((item: any) => item.jobId)

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