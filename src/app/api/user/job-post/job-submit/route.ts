
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { currentUser } from '@clerk/nextjs';
import { ObjectId } from 'mongodb';
import { MeiliSearch } from 'meilisearch';

const host = 'https://ms-f818396405c0-10172.nyc.meilisearch.io/';
const apiKey = '1116d49cd6e2aee89e3b54713b1bb9b1e4184651';
const indexName = 'title';

export async function POST(req: any, res: any) {

  const client = new MeiliSearch({
    host: host,
    apiKey: apiKey,
  });

  let { db } = await connectToDatabase();

  let data = await req.json()

  const user: any = await currentUser();

  data.recruiterId = user.id

  let updateData = { $set: {} };

  Object.keys(data).filter((key: any) => key !== "_id").forEach((element: any) => {
    updateData.$set[element] = data[element];
  });

  await db.collection("myjobposts").findOneAndUpdate({ _id: new ObjectId(data._id) }, updateData);

  if (data.postStatus === 2) {
    console.log(1);

    data.scrapedDate = new Date().toISOString();

    await client.index(indexName).addDocuments([data], { primaryKey: 'jobId' });

    await client.index(indexName).updateFilterableAttributes(["title", "city", "country", "occupationType", "companyName", "skills", "tertiaryDescription", "insightsV2", "jobId", "postStatus", "recruiterId", "scrapedDate"]);
    await client.index(indexName).updateSortableAttributes(["postStatus", "scrapedDate"]);
    await client.index(indexName).updateDistinctAttribute("companyName");

    console.log(2);
  }

  const myjobposts = await db.collection("myjobposts")
    .find({ postStatus: 1 })
    .toArray();

  return NextResponse.json({
    isOkay: true,
    myjobposts: myjobposts
  });

}