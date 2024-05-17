
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { currentUser } from '@clerk/nextjs';
import { ObjectId } from 'mongodb';
import { jobPostValidation } from '@/util/backend/job-post-validation'
import { v4 as uuidv4 } from 'uuid';
import { MeiliSearch } from 'meilisearch';
import axios from 'axios';

const host = 'https://ms-7b38c9a53bf5-9766.lon.meilisearch.io';
const apiKey = 'a9120440eb9dce6256f824577056a48700be88f0';
const indexName = 'title';

export async function POST(req: any, res: any) {

  let { db } = await connectToDatabase();
  let data = await req.json()
  const user: any = await currentUser();

  const client = new MeiliSearch({
    host: host,
    apiKey: apiKey,
  });

  data.recruiterId = user.id
  data.isComplete = false

  let { error, errorMessage }: any = jobPostValidation(data, 'info')

  if (error) {
    return NextResponse.json({
      isOkay: !error,
      errorMessage: errorMessage
    });
  }

  if (data._id) {

    let updateData = { $set: {} };

    Object.keys(data).filter((key: any) => key !== "_id").forEach((element: any) => {
      updateData.$set[element] = data[element];
    });

    await db.collection("myjobposts")
      .findOneAndUpdate({ _id: new ObjectId(data._id) }, updateData)
      .then((result: any) => {
      })
      .catch((err: any) => {
        console.log("err", err);
      })

  } else {

    let randomId = uuidv4();

    let jobPostingData = {
      jobId: randomId,
      ...data
    }

    // console.log(1);
    // await client.index(indexName).addDocuments(jobPostingData, { primaryKey: 'jobId' });
    // console.log(2);
    // await client.index(indexName).updateFilterableAttributes(["title", "city", "country", "occupationType", "companyName", "skills", "tertiaryDescription", "insightsV2", "jobId", "jobPostStatus", "recruiterId"]);
    // await client.index(indexName).updateSortableAttributes(["jobPostStatus"]);
    // await client.index(indexName).updateDistinctAttribute("companyName");
    // console.log(3);

    await db
      .collection("myjobposts")
      .insertOne(jobPostingData)
      .then((result: any) => {
        return result.insertedId
      })
  }

  // const response = await axios.post(
  //   `${host}/indexes/${indexName}/search`,
  //   {
  //     filter: [
  //       `recruiterId = "${user.id}"`,
  //       'postStatus = 0',
  //     ],
  //   },
  //   { headers: { 'Authorization': `Bearer ${apiKey}` } }
  // );

  // console.log("response", response);


  let result = await db
    .collection('myjobposts')
    .findOne({ _id: new ObjectId(data._id) });

  return NextResponse.json({
    isOkay: true,
    result: result
  });

}