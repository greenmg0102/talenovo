import { NextResponse } from "next/server";
import schedule from 'node-schedule';
import { v4 as uuidv4 } from 'uuid';
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

const host = 'https://search.talenovo.com';
const apiKey = '47dfe734-68fb-4b19-a96f-5f19a3355458';
const indexName = 'title';

// master key:  47dfe734-68fb-4b19-a96f-5f19a3355458
// search key:  29701137a41cf5f0f7fe1b1755bcc0dae0961a1c15e7c52cffa72e474b16f920
// admin  key:  aac5608cfb351aa04f9cc597f5f0c3c38c33fbd97ad73b1d97436e1edc783722

export async function GET(req: any, res: any) {

  // await adminAPIMiddleware(req, res);
  let { db } = await connectToDatabase();

  const client = new MeiliSearch({
    host: host,
    apiKey: apiKey,
  });


  console.log("scrapping-start");

  try {
    const jobDataIndex = await client.getIndex(indexName);
    console.log(`Index ${indexName} exists:`, jobDataIndex);
  } catch (error) {
    if (error.code === 'index_not_found') {
      console.log(`Index ${indexName} does not exist.`);
      await client.createIndex(indexName);
    } else {
      console.error('Error checking index existence:', error);
    }
  }

  console.log('2');

  // // let mailSendingResult = await sendEmail({ error: "", success: true })
  // // console.log("mailSendingResult", mailSendingResult);
  // // await JobAlertAutomation()

  // // let linkedin = await linkedinScrapping();
  let google = await googleScrapping();
  // // let indeed = await indeedScrapping();
  // // let kadoa = await KadoaScrapping();
  let real = google
  // // let real = [...linkedin, ...kadoa]  4416

  console.log('saving to the melisearch!', real.length);

  const chunkSize = 100;
  const iterations = Math.ceil(real.length / chunkSize);

  for (let i = 0; i < iterations; i++) {

    if (i % 50 === 0) {
      const health = await client.health();
      console.log('Server health:', health);
      console.log('Iterations-Index', i);
    }

    const start = i * chunkSize;
    const end = Math.min(start + chunkSize, real.length);
    const list = real.slice(start, end);

    await client.index(indexName).addDocuments(list, { primaryKey: 'jobId' });
  }

  console.log("Updating the filtering attributes!");

  await client.index(indexName).updateFilterableAttributes(["title", "city", "country", "occupationType", "companyName", "skills", "tertiaryDescription", "insightsV2", "jobId", "postStatus", "recruiterId", "scrapedDate"]);
  await client.index(indexName).updateSortableAttributes(["postStatus", "scrapedDate"]);
  await client.index(indexName).updateDistinctAttribute("companyName");

  console.log("Updating the filtering attributes ended!");

  if (real.length > 0) {
    console.log("There is some data today!");
    let totalstatisticResult = await db.collection('totalstatistic').findOne({ type: "todayJob" }).then((result: any) => result)

    if (totalstatisticResult) {
      console.log("Today job was updated!");
      let updateData = {
        $set: {
          type: "todayJob",
          count: real.length
        }
      };
      await db.collection("totalstatistic").findOneAndUpdate({ type: "todayJob" }, updateData);
    } else {
      await db
        .collection("totalstatistic")
        .insertOne({
          type: "todayJob",
          count: real.length
        })
        .then(async (result: any) => { return })
    }
  }

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

  // var processedResult = citiesJSON.filter((item: any) => item.country_id === 233).map((item: any) => {
  //   return {
  //     location: item.name + ", " + item.state_name + ", " + item.country_name,
  //     value: item.name + ", " + item.state_name + ", " + item.country_name
  //   };
  // });

  // console.log("processedResult", processedResult.length, processedResult[0]);

  // await db
  //   .collection("joblocations")
  //   .insertMany(processedResult.map((joblocation: any) => joblocation))
  //   .then(async (result: any) => {
  //     return
  //   })

  console.log('####');

  return NextResponse.json({
    result: true,
  });
}
