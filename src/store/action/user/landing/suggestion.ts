import axios from 'axios';

const host = 'https://ms-25a464fc2474-8311.nyc.meilisearch.io';
const apiKey = 'a9af493c2f5076aad794cab8b668828cb8f1835f';
const indexName = 'title';

export async function suggestJobs(data: any) {

    // const skillSet = data.skill; // Array of skills
    // const locationInfo = data.locatedin; // Array of skills
    // const countryInfo = locationInfo.split(", ")[1]
    // const cityInfo = locationInfo.split(", ")[0]
    
    const skillSet = ["Food Packaging"]
    const countryInfo = "MO"
    const cityInfo = "St Louis"

    // console.log("skillSet", skillSet);
    // console.log("locationInfo", locationInfo);

    let skillSetFilter = skillSet.map((itme: any) => { return `skills = "${itme}"`; })

    const response = await axios.post(
        `${host}/indexes/${indexName}/search`,
        {
            filter: [
                [...skillSetFilter],
                `country = "${countryInfo}"`,
                `city = "${cityInfo}"`,
            ],
            showRankingScore: true,
        },
        { headers: { 'Authorization': `Bearer ${apiKey}` } }
    );

    return response.data.hits
}