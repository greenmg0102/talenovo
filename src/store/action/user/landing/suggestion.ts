import axios from 'axios';

const host = 'https://ms-d932cad3594f-8320.sfo.meilisearch.io';
const apiKey = '45679470fdc94d8c90ef03712354389f8d209067';
const indexName = 'title';

export async function suggestJobs(data: any) {

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

    return response.data.hits
}