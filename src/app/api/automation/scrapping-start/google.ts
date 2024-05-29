import fetch from 'node-fetch';
import { v4 as uuidv4 } from 'uuid';
import { connectToDatabase } from "@/lib/mongodb";

export async function googleScrapping(): Promise<any> {

    let { db } = await connectToDatabase();

    let real: any = []

    const response = await fetch("https://api.apify.com/v2/acts/epctex~google-jobs-scraper/runs/last/dataset/items?token=apify_api_hN1OchKhIjdemiiVRgZksNWgtjFe5B3hMrMF", {
        method: 'GET'
    });

    // console.log("response", response);

    const data: any = await response.json();

    // let data = await db.collection("otherjobs").find().toArray();

    data.forEach((element: any) => {
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
