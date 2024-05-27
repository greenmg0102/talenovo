
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { currentUser } from '@clerk/nextjs';
import axios from 'axios';

const host = 'https://ms-7b38c9a53bf5-9766.lon.meilisearch.io';
const apiKey = 'a9120440eb9dce6256f824577056a48700be88f0';
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