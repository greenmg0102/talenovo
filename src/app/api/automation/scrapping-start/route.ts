import { NextResponse } from "next/server";
import schedule from 'node-schedule';
import axios from 'axios';
import { KadoaScrapping } from '@/app/api/automation/scrapping-start/kadoa'
import { linkedinScrapping } from '@/app/api/automation/scrapping-start/linkedin'
import { googleScrapping } from '@/app/api/automation/scrapping-start/google'
import { indeedScrapping } from '@/app/api/automation/scrapping-start/indeed'

import { bufferLocationData } from '@/app/api/automation/scrapping-start/bufferLocationData'

import { connectToDatabase } from "@/lib/mongodb";
import { adminAPIMiddleware } from '@/app/api/admin/middleware';
import { MeiliSearch } from 'meilisearch';
import JobAlertAutomation from '@/app/api/automation/scrapping-start/mailAutomation/jobAlert'

import { sendEmail } from '@/mailAction'

const host = 'https://ms-7b38c9a53bf5-9766.lon.meilisearch.io';
const apiKey = 'a9120440eb9dce6256f824577056a48700be88f0';
const indexName = 'title';

// master key:  a9120440eb9dce6256f824577056a48700be88f0
// search key:  8a3e51982f047c917dca3a2ceaa8439f728d06b2ef63d9f5c515486ad5c41796
// admin  key:  8a3e51982f047c917dca3a2ceaa8439f728d06b2ef63d9f5c515486ad5c41796

export async function GET(req: any, res: any) {

  // await adminAPIMiddleware(req, res);
  // let { db } = await connectToDatabase();

  // schedule.scheduleJob('0 */12 * * *', async () => {

  // console.log("scrapping-start");

  // let mailSendingResult = await sendEmail({ error: "", success: true })

  // console.log("mailSendingResult", mailSendingResult);

  // await JobAlertAutomation()

  // const client = new MeiliSearch({
  //   host: host,
  //   apiKey: apiKey,
  // });

  // let linkedin = await linkedinScrapping();
  // let google = await googleScrapping();
  // // let indeed = await indeedScrapping();
  // // // // let kadoa = await KadoaScrapping();
  // let real = google
  // // // // // let real = [...linkedin, ...kadoa]

  // console.log("real",real);

  // console.log(1);
  // await client.index(indexName).addDocuments(real, { primaryKey: 'jobId' });
  // console.log(2);
  // await client.index(indexName).updateFilterableAttributes(["title", "city", "country", "companyName", "jobId", "postStatus", "recruiterId"]);
  // // await client.index(indexName).updateFilterableAttributes(["title", "city", "country", "occupationType", "companyName", "skills", "tertiaryDescription", "insightsV2", "jobId", "postStatus", "recruiterId"]);
  // await client.index(indexName).updateSortableAttributes(["postStatus"]);
  // await client.index(indexName).updateDistinctAttribute("companyName");
  // console.log(3);

  // const response = await axios.post(
  //   `${host}/indexes/${indexName}/search`,
  //   { attributesToRetrieve: [], facets: ['*'] },
  //   { headers: { 'Authorization': `Bearer ${apiKey}` } }
  // );
  // const { facetDistribution } = response.data;
  // console.log(4);

  // const skillsList = Object.keys(facetDistribution.skills)

  // await db
  //   .collection("jobtags")
  //   .insertMany(skillsList.map(skill => ({ tag: skill })))
  //   .then(async (result: any) => {
  //     return
  //   })

  // let joblocationList: any = []

  // Object.keys(bufferLocationData).forEach((key: any, index: any) => {
  //   bufferLocationData[key].forEach((each: any, order: any) => {
  //     joblocationList.push({ location: each + ", " + key, value: each })
  //   })
  // })

  // console.log("joblocationList", joblocationList);

  // await db
  //   .collection("joblocations")
  //   .insertMany(joblocationList.map(joblocation => joblocation))
  //   .then(async (result: any) => {
  //     return
  //   })

  // })

  return NextResponse.json({
    result: true,
  });
}
