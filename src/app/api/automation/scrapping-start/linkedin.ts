import fetch from 'node-fetch';
import { v4 as uuidv4 } from 'uuid';

export async function linkedinScrapping(): Promise<any> {

    let real = []

    const response = await fetch("https://api.apify.com/v2/datasets/CcscIqlEmAbnVDz8f/items?token=apify_api_pgD0hi7CqXuisJAxdvUuhEAg1BIqrX4nWOcg", {
        method: 'GET'
    });

    const data: any = await response.json();

    data.forEach((element: any) => {
        let randomId = uuidv4();

        real.push({
            jobId: randomId,
            platform: "apify",
            subType: "linkedin",
            ...element,
            isComplete: true,
            isComfirm: true
        })
    });

    return real;
}
