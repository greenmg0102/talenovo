import axios from 'axios';

const host = 'https://ms-2eabdf8fdac6-9012.nyc.meilisearch.io';
const apiKey = '45949bbe2bf65ebe9aa08012ed5742c1373cc310';
const indexName = 'title';

export async function suggestJobs(data: any) {

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