import fetch from 'node-fetch';
import { v4 as uuidv4 } from 'uuid';

export async function indeedScrapping(): Promise<any> {

    let real = []

    const response = await fetch("https://api.apify.com/v2/datasets/xuFkAc0LchX3TZTIK/items?token=apify_api_pgD0hi7CqXuisJAxdvUuhEAg1BIqrX4nWOcg", {
        method: 'GET'
    });

    // const data: any = await response.json();

    // data.forEach((element: any) => {
    //     let randomId = uuidv4();

    //     real.push({
    //         jobId: randomId,
    //         platform: "apify",
    //         subType: "linkedin",
    //         ...element,
    //         city: element.location.split(" (")[0].split(", ")[0],
    //         country: element.location.split(" (")[0].split(", ")[1],
    //         occupationType: element.location.split(" (")[element.location.split(" (").length - 1].slice(0, -1),
    //         insightsV2: element.insightsV2.map((item: any) => item.split("·")[1]),
    //         isComplete: true,
    //         isComfirm: true
    //     })
    // });

    return real;
}
