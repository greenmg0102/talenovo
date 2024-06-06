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
    // const response4: any = await fetch("https://api.apify.com/v2/datasets/kfgIzPhO5GjdefM9C/items?clean=true&format=json", {
    //     method: 'GET'
    // });
    // const response5: any = await fetch("https://api.apify.com/v2/datasets/C9iiG9CTL6askdwRw/items?clean=true&format=json", {
    //     method: 'GET'
    // });
    // const response6: any = await fetch("https://api.apify.com/v2/datasets/cn8vVJZRaKdsWT6L1/items?clean=true&format=json", {
    //     method: 'GET'
    // });
    // const response7: any = await fetch("https://api.apify.com/v2/datasets/hRR7RibdgPNQvxJrU/items?clean=true&format=json", {
    //     method: 'GET'
    // });
    // const response8: any = await fetch("https://api.apify.com/v2/datasets/7js6idPcgNgOB84qm/items?clean=true&format=json", {
    //     method: 'GET'
    // });
    // const response9: any = await fetch("https://api.apify.com/v2/datasets/TYsdNUdQBvYc9F4AA/items?clean=true&format=json", {
    //     method: 'GET'
    // });
    const response10: any = await fetch("https://api.apify.com/v2/datasets/7yAh44p4Dc81rPyvL/items?clean=true&format=json", {
        method: 'GET'
    });
    
    // const data1: any = await response1.json();
    // const data2: any = await response2.json();
    // const data3: any = await response3.json();
    // const data4: any = await response4.json();
    // const data5: any = await response5.json();
    // const data6: any = await response6.json();
    // const data8: any = await response8.json();
    // const data9: any = await response9.json();
    const data10: any = await response10.json();

    // // let data = await db.collection("otherjobs").find().toArray();

    data10.forEach((element: any) => {
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
