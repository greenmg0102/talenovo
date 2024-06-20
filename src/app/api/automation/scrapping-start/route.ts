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

const host = 'https://ms-ce7a48ac689b-10562.nyc.meilisearch.io';
const apiKey = '9fbe0270ada537d37c34e0f768ceed9fe2ae3b6b';
const indexName = 'title';

// master key:  9fbe0270ada537d37c34e0f768ceed9fe2ae3b6b
// search key:  29701137a41cf5f0f7fe1b1755bcc0dae0961a1c15e7c52cffa72e474b16f920
// admin  key:  aac5608cfb351aa04f9cc597f5f0c3c38c33fbd97ad73b1d97436e1edc783722

export async function GET(req: any, res: any) {

  // const client = new MeiliSearch({
  //   host: host,
  //   apiKey: apiKey,
  // });

  // // await adminAPIMiddleware(req, res);
  // let { db } = await connectToDatabase();

  // // schedule.scheduleJob('0 */12 * * *', async () => {

  // // })

  // let datasetArray = await axios.get('https://api.apify.com/v2/datasets?offset=0&limit=2&desc=true&unnamed=true&token=apify_api_mUPBlIjurqf8M4smqcQ23KqEyJkeaa4fJlSb')
  //   .then(response => {
  //     return response.data.data.items.map((item: any) => item.id)
  //   })
  //   .catch(error => {
  //     console.error('Error:', error.response.data);
  //   });

  // let runnedDatasetArray = datasetArray.map((item: any) => {
  //   return {
  //     type: "apify",
  //     subType: "google",
  //     datasetid: item
  //   };
  // });

  
  // // let currencyResult = await db
  // //   .collection('scrappingids')
  // //   .find()
  // //   .toArray();
  
  // // console.log("currencyResult", currencyResult.length);
  
  // // // Create a Set of datasetids from array B for fast lookup
  // // let datasetIdsB: any = currencyResult.map((item: any) => item.datasetid);
  // // console.log("datasetIdsB", datasetIdsB.length);
  
  // // // Find an item in array A whose datasetid is not in the Set of datasetids from array B
  // // let itemNotInB = runnedDatasetArray.filter((item: any) => !datasetIdsB.includes(item.datasetid));
  
  // // console.log("itemNotInB", itemNotInB.length);
  
  // if (runnedDatasetArray.length > 0) {
    
    
  //   console.log("runnedDatasetArray", runnedDatasetArray.length);

  //   let realGoogleData: any = []

  //   for (let i = 0; i < runnedDatasetArray.length; i++) {

  //     console.log("i", i);
      

  //     let buffer: any = await fetch(`https://api.apify.com/v2/datasets/${runnedDatasetArray[i].datasetid}/items?clean=true&format=json`, {
  //       method: 'GET'
  //     });

  //     let bufferJsonData: any = await buffer.json();

  //     console.log("bufferJsonData", bufferJsonData.length);
      
  //     // realGoogleData.push(bufferJsonData)
  //     // realGoogleData = [...realGoogleData, ...bufferJsonData]

  //     bufferJsonData.forEach((element: any, index: any) => {

  //       let randomId = uuidv4();
  //       realGoogleData.push({
  //           ...element,
  //           jobId: randomId,
  //           platform: "apify",
  //           subType: "google",
  //           city: element.location.split(" (")[0].split(", ")[0],
  //           country: element.location.split(" (")[0].split(", ")[1],
  //           insightsV2: element.metadata.scheduleType,
  //           occupationType: element.metadata.scheduleType,
  //           // isComplete: true,
  //           // isComfirm: true,
  //           postStatus: 1,
  //           scrapedDate: new Date().toISOString()
  //       })
  //   });

  //   }

  //   console.log('saving to the monogodb');
  //   console.log('realGoogleData.length', realGoogleData.length);

  //   await db
  //     .collection("scrappingids")
  //     .insertMany(runnedDatasetArray.map((scrappingid: any) => scrappingid))
  //     .then(async (result: any) => {
  //       return
  //     })

  //   console.log('ending saving');

  //   let chunkSize = 100;
  //   let iterations = Math.ceil(realGoogleData.length / chunkSize);

  //   for (let i = 0; i < iterations; i++) {
  //     console.log('Index', i);
  //     let start = i * chunkSize;
  //     let end = Math.min(start + chunkSize, realGoogleData.length);
  //     let list = realGoogleData.slice(start, end);

  //     console.log('saving ...', list.length);
  //     await client.index(indexName).addDocuments(list, { primaryKey: 'jobId' });;

  //   }

  //   // await client.index(indexName).addDocuments(realGoogleData, { primaryKey: 'jobId' });

  //   console.log(2);
  //   // await client.index(indexName).updateFilterableAttributes(["title", "city", "country", "companyName", "jobId", "postStatus", "recruiterId"]);

  //   await client.index(indexName).updateFilterableAttributes(["title", "city", "country", "occupationType", "companyName", "skills", "tertiaryDescription", "insightsV2", "jobId", "postStatus", "recruiterId", "scrapedDate"]);
  //   await client.index(indexName).updateSortableAttributes(["postStatus", "scrapedDate"]);
  //   await client.index(indexName).updateDistinctAttribute("companyName");
  //   console.log(3);


  // } else {
  //   console.log('There is no data!');

  // }


  // await db
  //   .collection("scrappingids")
  //   .insertMany(runnedDatasetArray.map((scrappingid: any) => scrappingid))
  //   .then(async (result: any) => {
  //     return
  //   })




  // schedule.scheduleJob('0 */12 * * *', async () => {

  // console.log("scrapping-start");

  // let mailSendingResult = await sendEmail({ error: "", success: true })

  // console.log("mailSendingResult", mailSendingResult);

  // await JobAlertAutomation()


  // let linkedin = await linkedinScrapping();
  // let google = await googleScrapping();
  // let indeed = await indeedScrapping();
  // let kadoa = await KadoaScrapping();
  // let real = google
  // // // // // let real = [...linkedin, ...kadoa]  4416

  // console.log("real", real.length);

  // console.log(1);

  // const chunkSize = 100;
  // const iterations = Math.ceil(real.length / chunkSize);

  // for (let i = 0; i < iterations; i++) {
  //   console.log('Index', i);
  //   const start = i * chunkSize;
  //   const end = Math.min(start + chunkSize, real.length);
  //   const list = real.slice(start, end);

  //   console.log('saving ...', list.length);
  //   await client.index(indexName).addDocuments(list, { primaryKey: 'jobId' });;

  // }

  // console.log(2);
  // await client.index(indexName).updateFilterableAttributes(["title", "city", "country", "occupationType", "companyName", "skills", "tertiaryDescription", "insightsV2", "jobId", "postStatus", "recruiterId", "scrapedDate"]);
  // await client.index(indexName).updateSortableAttributes(["postStatus", "scrapedDate"]);
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

  // const citiesJSON = await fetch('https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master/cities.json').then(response => response.json());

  // var processedResult = citiesJSON.filter((item: any) => item.country_id === 233).map((item: any) => {
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
