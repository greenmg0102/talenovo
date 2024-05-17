
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { currentUser } from '@clerk/nextjs';
import axios from 'axios';

const host = 'https://ms-7b38c9a53bf5-9766.lon.meilisearch.io';
const apiKey = 'a9120440eb9dce6256f824577056a48700be88f0';
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