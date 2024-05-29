import fetch from 'node-fetch';
import { v4 as uuidv4 } from 'uuid';
import { connectToDatabase } from "@/lib/mongodb";

export async function linkedinScrapping(): Promise<any> {

    let { db } = await connectToDatabase();

    let real: any = []

    const response = await fetch("https://api.apify.com/v2/acts/curious_coder~linkedin-jobs-search-scraper/runs/last/dataset/items?token=apify_api_hN1OchKhIjdemiiVRgZksNWgtjFe5B3hMrMF", {
        method: 'GET'
    });

    const data: any = await response.json();

    // let data = await db.collection("otherjobs").find().toArray();

    data.slice(0, 1).forEach((element: any) => {
        let randomId = uuidv4();
        real.push({
            jobId: randomId,
            platform: "apify",
            subType: "linkedin",
            ...element,
            city: element.location.split(" (")[0].split(", ")[0],
            country: element.location.split(" (")[0].split(", ")[1],
            // occupationType: element.location.split(" (")[element.location.split(" (").length - 1].slice(0, -1),
            // insightsV2: element.insightsV2.map((item: any) => item.split("·")[1]),
            // isComplete: true,
            // isComfirm: true,
            postStatus: 1,
            scrapedDate: new Date().toISOString()
        })
    });

    console.log("linkedinScrapping", real);

    return real;
}
