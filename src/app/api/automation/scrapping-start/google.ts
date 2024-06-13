import fetch from 'node-fetch';
import { v4 as uuidv4 } from 'uuid';
import { connectToDatabase } from "@/lib/mongodb";

export async function googleScrapping(): Promise<any> {

    // let { db } = await connectToDatabase();

    let real: any = []

    // const response1: any = await fetch("https://api.apify.com/v2/acts/epctex~google-jobs-scraper/runs/last/dataset/items?token=apify_api_hN1OchKhIjdemiiVRgZksNWgtjFe5B3hMrMF", {
    //     method: 'GET'
    // });
    // console.log("response1");
    // const response2: any = await fetch("https://api.apify.com/v2/datasets/FbfbRomxviZx2wraV/items?clean=true&format=json", {
    //     method: 'GET'
    // });
    // console.log("response2");
    // const response3: any = await fetch("https://api.apify.com/v2/datasets/mpxPuE1hTeDbDhoYR/items?clean=true&format=json", {
    //     method: 'GET'
    // });
    // console.log("response3");
    // const response4: any = await fetch("https://api.apify.com/v2/datasets/kfgIzPhO5GjdefM9C/items?clean=true&format=json", {
    //     method: 'GET'
    // });
    // console.log("response4");
    // const response5: any = await fetch("https://api.apify.com/v2/datasets/C9iiG9CTL6askdwRw/items?clean=true&format=json", {
    //     method: 'GET'
    // });
    // console.log("response5");
    // const response6: any = await fetch("https://api.apify.com/v2/datasets/cn8vVJZRaKdsWT6L1/items?clean=true&format=json", {
    //     method: 'GET'
    // });
    // console.log("response6");
    // const response7: any = await fetch("https://api.apify.com/v2/datasets/hRR7RibdgPNQvxJrU/items?clean=true&format=json", {
    //     method: 'GET'
    // });
    // console.log("response7");
    // const response8: any = await fetch("https://api.apify.com/v2/datasets/7js6idPcgNgOB84qm/items?clean=true&format=json", {
    //     method: 'GET'
    // });
    // console.log("response8");
    // const response9: any = await fetch("https://api.apify.com/v2/datasets/TYsdNUdQBvYc9F4AA/items?clean=true&format=json", {
    //     method: 'GET'
    // });
    // console.log("response9");
    // const response10: any = await fetch("https://api.apify.com/v2/datasets/7yAh44p4Dc81rPyvL/items?clean=true&format=json", {
    //     method: 'GET'
    // });
    // console.log("response10");
    // const response11: any = await fetch("https://api.apify.com/v2/datasets/Y9NxXhchk2jih5glp/items?clean=true&format=json", {
    //     method: 'GET'
    // });
    // console.log("response11");
    // const response12: any = await fetch("https://api.apify.com/v2/datasets/TFamaxUQ4fciH7sqk/items?clean=true&format=json", {
    //     method: 'GET'
    // });
    // console.log("response12");
    // const response13: any = await fetch("https://api.apify.com/v2/datasets/vilXYUyLIeHAcfCtJ/items?clean=true&format=json", {
    //     method: 'GET'
    // });
    // console.log("response13");
    // const response14: any = await fetch("https://api.apify.com/v2/datasets/ogAawGFZc4Qw7SF90/items?clean=true&format=json", {
    //     method: 'GET'
    // });
    // console.log("response14");
    // const response15: any = await fetch("https://api.apify.com/v2/datasets/GY55Dk5fsIWcmcWAf/items?clean=true&format=json", {
    //     method: 'GET'
    // });
    // console.log("response15");
    // const response16: any = await fetch("https://api.apify.com/v2/datasets/e7IDBVh1oXPGB9LGB/items?clean=true&format=json", {
    //     method: 'GET'
    // });
    // console.log("response16");
    // const response17: any = await fetch("https://api.apify.com/v2/datasets/wK56PbM2cjQNkCQgJ/items?clean=true&format=json", {
    //     method: 'GET'
    // });
    // console.log("response17");
    // const response18: any = await fetch("https://api.apify.com/v2/datasets/TqWdwyHYKfmnQvVHp/items?clean=true&format=json", {
    //     method: 'GET'
    // });
    // console.log("response18");
    // const response19: any = await fetch("https://api.apify.com/v2/datasets/Bmn7VfeQpiJffYya2/items?clean=true&format=json", {
    //     method: 'GET'
    // });
    // console.log("response19");
    // const response20: any = await fetch("https://api.apify.com/v2/datasets/AV22YnAqyKt2Pv2V4/items?clean=true&format=json", {
    //     method: 'GET'
    // });
    // console.log("response20");
    const response21: any = await fetch("https://api.apify.com/v2/datasets/oraGOIf0MxU5NdBRu/items?clean=true&format=json", {
        method: 'GET'
    });
    console.log("response21");
    const response22: any = await fetch("https://api.apify.com/v2/datasets/1sfofBi22s1pJ6fWj/items?clean=true&format=json", {
        method: 'GET'
    });
    console.log("response22");
    const response23: any = await fetch("https://api.apify.com/v2/datasets/50HZerTF7q53tMArR/items?clean=true&format=json", {
        method: 'GET'
    });
    console.log("response23");
    const response24: any = await fetch("https://api.apify.com/v2/datasets/9V1uPs3jepbapw5Uh/items?clean=true&format=json", {
        method: 'GET'
    });
    console.log("response24");

    // const data1: any = await response1.json();
    // const data2: any = await response2.json();
    // const data3: any = await response3.json();
    // const data4: any = await response4.json();
    // console.log("data 1 ~ 4");
    // const data5: any = await response5.json();
    // const data6: any = await response6.json();
    // const data7: any = await response7.json();
    // const data8: any = await response8.json();
    // console.log("data 5 ~ 8");
    // const data9: any = await response9.json();
    // const data10: any = await response10.json();
    // const data11: any = await response11.json();
    // const data12: any = await response12.json();
    // const data13: any = await response13.json();
    // console.log("data 9 ~ 13");
    // const data14: any = await response14.json();
    // const data15: any = await response15.json();
    // const data16: any = await response16.json();
    // const data17: any = await response17.json();
    // console.log("data 14 ~ 17");
    // const data18: any = await response18.json();
    // const data19: any = await response19.json();
    // const data20: any = await response20.json();
    const data21: any = await response21.json();
    const data22: any = await response22.json();
    const data23: any = await response23.json();
    const data24: any = await response24.json();

    // let bufferReal = [...data1, ...data2, ...data3, ...data4, ...data5, ...data6, ...data7, ...data8, ...data9, ...data10, ...data11, ...data12, ...data13, ...data14, ...data15, ...data16, ...data17, ...data18, ...data19, ...data20]
    let bufferReal = [...data21, ...data22, ...data23, ...data24]

    // // let data = await db.collection("otherjobs").find().toArray();
    console.log("bufferReal done!");

    bufferReal.forEach((element: any, index: any) => {

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
