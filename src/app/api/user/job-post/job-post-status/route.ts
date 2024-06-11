
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { currentUser } from '@clerk/nextjs';
import axios from 'axios';

const host = 'https://ms-ce7a48ac689b-10562.nyc.meilisearch.io/';
const apiKey = '9fbe0270ada537d37c34e0f768ceed9fe2ae3b6b';
const indexName = 'title';

export async function GET(req: any, res: any) {

  let { db } = await connectToDatabase();
  const user: any = await currentUser();

  // const response = await axios.post(
  //   `${host}/indexes/${indexName}/search`,
  //   {
  //     // Specify the search query with filters
  //     q: '', // Leave empty to match all documents
  //     filter: `recruiterId = "user_2gPEQxusWFfX37olXzv9eUNuNNr" AND postStatus = "0"`
  //     // filter: [
  //     //   `postStatus = ${0}`,
  //     // `recruiterId = "user_2fRN4xDzHhiczc6ueUt3tO7kwOn" AND 
  //     // ],
  //     // Add any additional parameters such as pagination, attributes to retrieve, etc.
  //   },
  //   { headers: { 'Authorization': `Bearer ${apiKey}` } }
  // );


  // // filter: [
  // //   `recruiterId = "${user.id}"`,
  // //   'postStatus = 0',
  // // ],

  // console.log("recruiterId", user.id);
  // console.log("response.data", response.data);

  // const meilisearchData = response.data.hits[0];

  let result = await db
    .collection('myjobposts')
    .findOne({ recruiterId: user.id, postStatus: 0 });

  return NextResponse.json(result === null ? {} : result);

}