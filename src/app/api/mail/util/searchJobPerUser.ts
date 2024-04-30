import axios from 'axios';

const host = 'https://ms-1dd1c86bf47e-9385.nyc.meilisearch.io';
const apiKey = 'e6c3cf035914f999bc89bdc1c13aa1bcfb930fb2';
const indexName = 'title';

export default async function searchJobPerUser(data: any) {

    console.log("searchJobPerUser", data);

    // const skillSet = data.skill; // Array of skills
    // const locationInfo = data.locatedin; // Array of skills
    // const countryInfo = locationInfo.split(", ")[1]
    // const cityInfo = locationInfo.split(", ")[0]

    const skillSet = ["Communication"]
    const countryInfo = "FL"
    const cityInfo = "Miami"

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

    return response.data.hits.length
}