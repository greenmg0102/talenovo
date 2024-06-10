import { NextResponse } from "next/server";
import schedule from 'node-schedule';
import axios from 'axios';
import { KadoaScrapping } from '@/app/api/automation/scrapping-start/kadoa'
import { linkedinScrapping } from '@/app/api/automation/scrapping-start/linkedin'
import { googleScrapping } from '@/app/api/automation/scrapping-start/google'
import { indeedScrapping } from '@/app/api/automation/scrapping-start/indeed'

import { stateList, countryList } from '@/app/api/automation/scrapping-start/temp'
// import { bufferLocationData } from '@/app/api/automation/scrapping-start/bufferLocationData'

import { connectToDatabase } from "@/lib/mongodb";
import { adminAPIMiddleware } from '@/app/api/admin/middleware';
import { MeiliSearch } from 'meilisearch';
import JobAlertAutomation from '@/app/api/automation/scrapping-start/mailAutomation/jobAlert'

import { sendEmail } from '@/mailAction'

const host = 'https://ms-f818396405c0-10172.nyc.meilisearch.io';
const apiKey = '1116d49cd6e2aee89e3b54713b1bb9b1e4184651';
const indexName = 'title';

// master key:  1116d49cd6e2aee89e3b54713b1bb9b1e4184651
// search key:  51dc23779244ba4a456f9f866e2bcabb1f57ee2abfb9ba77a3ecb7f776886340
// admin  key:  5c512be0df5e15e8d97251025ff578bbd1edc8e7429c4f7a3917361b13033fbd

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
  // let indeed = await indeedScrapping();
  // let kadoa = await KadoaScrapping();
  // let real = google
  // // // // // let real = [...linkedin, ...kadoa]  4416

  // console.log("real", real.length);

  console.log(1);
  // await client.index(indexName).addDocuments(real, { primaryKey: 'jobId' });
  console.log(2);
  // await client.index(indexName).updateFilterableAttributes(["title", "city", "country", "companyName", "jobId", "postStatus", "recruiterId"]);

  // await client.index(indexName).updateFilterableAttributes(["title", "city", "country", "occupationType", "companyName", "skills", "tertiaryDescription", "insightsV2", "jobId", "postStatus", "recruiterId", "scrapedDate"]);
  // await client.index(indexName).updateSortableAttributes(["postStatus", "scrapedDate"]);
  // await client.index(indexName).updateDistinctAttribute("companyName");
  console.log(3);

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

  // const citiesJSON = await fetch('https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master/cities.json').then(response => response.json());

  // var processedResult = citiesJSON.slice(100000, 150634).map((item: any) => {
  //   return {
  //     location: item.name + ", " + item.state_name + ` (${item.state_code})` + ", " + item.country_name + ` (${item.country_code})`,
  //     value: item.name + ", " + item.state_name + ` (${item.state_code})` + ", " + item.country_name + ` (${item.country_code})`
  //   };
  // });

  // console.log("processedResult", processedResult.length, processedResult[0]);

  // await db
  //   .collection("joblocations")
  //   .insertMany(processedResult.map((joblocation: any) => joblocation))
  //   .then(async (result: any) => {
  //     return
  //   })

  // console.log('####');

  return NextResponse.json({
    result: true,
  });
}
