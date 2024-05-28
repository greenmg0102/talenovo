
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { currentUser } from '@clerk/nextjs';
import axios from 'axios';

const host = 'https://ms-f818396405c0-10172.nyc.meilisearch.io/';
const apiKey = '1116d49cd6e2aee89e3b54713b1bb9b1e4184651';
const indexName = 'title';

export async function POST(req: any, res: any) {

  let { db } = await connectToDatabase();
  const user: any = await currentUser();
  const data = await req.json()

  const response = await axios.post(
    `${host}/indexes/${indexName}/search`,
    {
      // Specify the search query with filters
      q: '', // Leave empty to match all documents
      filter: `recruiterId = "${user.id}" AND postStatus = "2"`
      // filter: [
      //   `postStatus = ${0}`,
      // `recruiterId = "user_2fRN4xDzHhiczc6ueUt3tO7kwOn" AND 
      // ],
      // Add any additional parameters such as pagination, attributes to retrieve, etc.
    },
    { headers: { 'Authorization': `Bearer ${apiKey}` } }
  );

  const meilisearchData = response.data.hits;

  const myjobposts = await db.collection("myjobposts")
    .find({ recruiterId: user.id, postStatus: { $in: [1] } })
    .sort({ _id: -1 })
    .toArray();

  return NextResponse.json({
    myjobposts: [...meilisearchData, ...myjobposts],
  });

}