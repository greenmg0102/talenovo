import fetch from 'node-fetch';
import { v4 as uuidv4 } from 'uuid';
import { connectToDatabase } from "@/lib/mongodb";

export async function googleScrapping(): Promise<any> {

    let { db } = await connectToDatabase();

    let real: any = []

    // const response1: any = await fetch("https://api.apify.com/v2/acts/epctex~google-jobs-scraper/runs/last/dataset/items?token=apify_api_hN1OchKhIjdemiiVRgZksNWgtjFe5B3hMrMF", {
    //     method: 'GET'
    // });

    // const response2: any = await fetch("https://api.apify.com/v2/datasets/FbfbRomxviZx2wraV/items?clean=true&format=json", {
    //     method: 'GET'
    // });

    // const response3: any = await fetch("https://api.apify.com/v2/datasets/mpxPuE1hTeDbDhoYR/items?clean=true&format=json", {
    //     method: 'GET'
    // });

    const response4: any = await fetch("https://api.apify.com/v2/datasets/kfgIzPhO5GjdefM9C/items?clean=true&format=json", {
        method: 'GET'
    });


    // const data1: any = await response1.json();
    // const data2: any = await response2.json();

    // console.log("data2", data2);

    // const data3: any = await response3.json();
    const data4: any = await response4.json();



    // // let data = await db.collection("otherjobs").find().toArray();

    data4.forEach((element: any) => {
        let randomId = uuidv4();
        real.push({
            ...element,
            jobId: randomId,
            platform: "apify",
            subType: "google",
            city: element.location.split(" (")[0].split(", ")[0],
            country: element.location.split(" (")[0].split(", ")[1],
            insightsV2: element.metadata.scheduleType,
            occupationType: element.metadata.scheduleType,
            // isComplete: true,
            // isComfirm: true,
            postStatus: 1,
            scrapedDate: new Date().toISOString()
        })
    });

    // console.log("googleScrapping", real);

    return real;
}
