import axios from 'axios';

const host = 'https://ms-ce7a48ac689b-10562.nyc.meilisearch.io/';
const apiKey = '9fbe0270ada537d37c34e0f768ceed9fe2ae3b6b';
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