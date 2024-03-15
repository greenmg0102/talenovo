import fetch from 'node-fetch';

export async function linkedinScrapping(): Promise<any> {

    let real = []

    const response = await fetch("https://api.apify.com/v2/datasets/CcscIqlEmAbnVDz8f/items?token=apify_api_pgD0hi7CqXuisJAxdvUuhEAg1BIqrX4nWOcg", {
        method: 'GET'
    });

    const data: any = await response.json();

    data.forEach((element: any) => {
        real.push({
            platform: "apify",
            subType: "linkedin",
            ...element,
            isComplete: true,
            isComfirm: true
        })
    });

    return real;
}
