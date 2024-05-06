import axios from 'axios';

const host = 'https://ms-1dd1c86bf47e-9385.nyc.meilisearch.io';
const apiKey = 'e6c3cf035914f999bc89bdc1c13aa1bcfb930fb2';
const indexName = 'title';

export async function suggestJobs(data: any) {

    console.log("processingData", data);

    let processingData = data
    const cityInfo = processingData.locatedin.split(", ")[0]
    const skillSet = processingData.skill

    if (processingData.jobalertsetting === undefined) {

        const response = await axios.post(
            `${host}/indexes/${indexName}/search`,
            {
                filter: [
                    `city = "${cityInfo}"`,
                ],
                showRankingScore: true,
                limit: 20,
            },
            { headers: { 'Authorization': `Bearer ${apiKey}` } }
        );

        return response.data.hits
    } else {

        let skillSetFilter = skillSet.map((itme: any) => { return `skills = "${itme}"`; })

        let queryList = processingData.jobalertsetting.titleList.join(" ")

        const response = await axios.post(
            `${host}/indexes/${indexName}/search`,
            {
                q: queryList,
                filter: [
                    [...skillSetFilter],
                    `city = "${cityInfo}"`,
                ],
                showRankingScore: true,
                limit: 20,
            },
            { headers: { 'Authorization': `Bearer ${apiKey}` } }
        );

        return response.data.hits
    }

}