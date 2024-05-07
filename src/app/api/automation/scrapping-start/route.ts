import { NextResponse } from "next/server";
import schedule from 'node-schedule';
import axios from 'axios';
import { KadoaScrapping } from '@/app/api/automation/scrapping-start/kadoa'
import { linkedinScrapping } from '@/app/api/automation/scrapping-start/linkedin'
import { indeedScrapping } from '@/app/api/automation/scrapping-start/indeed'

import { connectToDatabase } from "@/lib/mongodb";
import { adminAPIMiddleware } from '@/app/api/admin/middleware';
import { MeiliSearch } from 'meilisearch';
import JobAlertAutomation from '@/app/api/automation/scrapping-start/mailAutomation/jobAlert'

// const host = 'https://ms-1dd1c86bf47e-9385.nyc.meilisearch.io';
// const apiKey = 'e6c3cf035914f999bc89bdc1c13aa1bcfb930fb2';
// const indexName = 'title';

// master key:  e6c3cf035914f999bc89bdc1c13aa1bcfb930fb2
// search key:  d07ef4b8bcd4218536209eb0bf8201f4d5a0d34c742d662512bc50aae4493d1e
// admin  key:  d07ef4b8bcd4218536209eb0bf8201f4d5a0d34c742d662512bc50aae4493d1e

export async function GET(req: any, res: any) {

  // await adminAPIMiddleware(req, res);
  // let { db } = await connectToDatabase();

  // schedule.scheduleJob('0 */12 * * *', async () => {

  console.log("scrapping-start");

  // await JobAlertAutomation()

  // const client = new MeiliSearch({
  //   host: host,
  //   apiKey: apiKey,
  // });

  // let linkedin = await linkedinScrapping();
  // // let indeed = await indeedScrapping();
  // // // // let kadoa = await KadoaScrapping();
  // let real = linkedin
  // // // // // let real = [...linkedin, ...kadoa]

  // console.log(1);
  // await client.index(indexName).addDocuments(real, { primaryKey: 'jobId' });
  // console.log(2);
  // await client.index(indexName).updateFilterableAttributes(["title", "city", "country", "occupationType", "companyName", "skills", "tertiaryDescription", "insightsV2", "jobId"]);
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

  // })

  return NextResponse.json({
    result: true,
  });
}
