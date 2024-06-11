
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { currentUser } from '@clerk/nextjs';
import axios from 'axios';

const host = 'https://ms-ce7a48ac689b-10562.nyc.meilisearch.io/';
const apiKey = '9fbe0270ada537d37c34e0f768ceed9fe2ae3b6b';
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