import axios from 'axios';

const host = 'https://ms-7b38c9a53bf5-9766.lon.meilisearch.io';
const apiKey = 'a9120440eb9dce6256f824577056a48700be88f0';
const indexName = 'title';

export async function suggestJobs(data: any) {

    let processingData = data
    const cityInfo = processingData.locatedin.split(", ")[0]
    const skillSet = processingData.skill

    if (processingData.jobalertsetting === undefined) {

        console.log("processingData 1", data);

        const response = await axios.post(
            `${host}/indexes/${indexName}/search`,
            {
                filter: [
                    `city = "${cityInfo}"`,
                ],
                showRankingScore: true,
                limit: 20,
                sort: ['postStatus:asc']
            },
            { headers: { 'Authorization': `Bearer ${apiKey}` } }
        );

        return response.data.hits
    } else {

        console.log("processingData 2", data);

        let skillSetFilter = skillSet.map((itme: any) => { return `skills = "${itme}"`; })

        let queryList = processingData.jobalertsetting.titleList.join(" ")

        const response = await axios.post(
            `${host}/indexes/${indexName}/search`,
            {
                q: queryList,
                filter: [
                    [...skillSetFilter],
                    `city = "${cityInfo}"`,
                    'postStatus = 2 OR postStatus = 3'
                ],
                showRankingScore: true,
                limit: 20,
                sort: ['postStatus:asc']
            },
            { headers: { 'Authorization': `Bearer ${apiKey}` } }
        );

        return response.data.hits
    }

}