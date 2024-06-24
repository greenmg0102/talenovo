import fetch from 'node-fetch';
import axios from 'axios';
import schedule from 'node-schedule';
import { v4 as uuidv4 } from 'uuid';
import { connectToDatabase } from "@/lib/mongodb";

let { db } = await connectToDatabase();

export async function googleScrapping(): Promise<any> {

    let datasetArray = await axios.get('https://api.apify.com/v2/datasets?offset=0&limit=999&desc=true&unnamed=true&token=apify_api_mUPBlIjurqf8M4smqcQ23KqEyJkeaa4fJlSb')
        .then(response => {
            return response.data.data.items.map((item: any) => item.id)
        })
        .catch(error => {
            console.error('Error:', error.response.data);
            return []
        });

    let runnedDatasetArray = datasetArray.map((item: any) => {
        return {
            type: "apify",
            subType: "google",
            datasetid: item
        };
    });

    let currencyResult = await db
        .collection('scrappingids')
        .find({ subType: "google" })
        .toArray();
    let datasetIdsB: any = currencyResult.map((item: any) => item.datasetid);

    let itemNotInB = runnedDatasetArray.filter((item: any) => !datasetIdsB.includes(item.datasetid));
    console.log("itemNotInB", itemNotInB.length);

    let realGoogleData: any = []

    for (let i = 0; i < itemNotInB.length; i++) {

        console.log("i", i);

        let buffer: any = await fetch(`https://api.apify.com/v2/datasets/${itemNotInB[i].datasetid}/items?clean=true&format=json`, {
            method: 'GET'
        });

        let bufferJsonData: any = await buffer.json();
        console.log("bufferJsonData", bufferJsonData.length);

        bufferJsonData.forEach((element: any, index: any) => {

            let randomId = uuidv4();
            realGoogleData.push({
                ...element,
                jobId: randomId,
                platform: "apify",
                subType: "google",
                city: element.location.split(" (")[0].split(", ")[0],
                country: element.location.split(" (")[0].split(", ")[1],
                insightsV2: element.metadata.scheduleType,
                occupationType: element.metadata.scheduleType,
                postStatus: 1,
                scrapedDate: new Date().toISOString()
            })
        });

        console.log("re-structuring in JSON was done!");
        
    }

    console.log('saving to the monogodb');
    console.log('realGoogleData.length', realGoogleData.length);

    if (itemNotInB.length > 0) {
        await db
            .collection("scrappingids")
            .insertMany(runnedDatasetArray.map((scrappingid: any) => scrappingid))
            .then(async (result: any) => { return })
    }

    return realGoogleData;
}
