import axios from 'axios';

const host = 'https://ms-f818396405c0-10172.nyc.meilisearch.io/';
const apiKey = '1116d49cd6e2aee89e3b54713b1bb9b1e4184651';
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