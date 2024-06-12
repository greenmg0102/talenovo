import axios from 'axios';

const host = 'https://ms-ce7a48ac689b-10562.nyc.meilisearch.io';
const apiKey = '9fbe0270ada537d37c34e0f768ceed9fe2ae3b6b';
const indexName = 'title';

export async function newletterSubscribePost(data: any) {
    const res = await fetch('https://talenovo.com/api/user/newsletter-confirm', {
        method: 'POST',
        body: JSON.stringify(data)
    });
    return await res.json();
}
export async function newletterSubscribeGet() {
    const res = await fetch('https://talenovo.com/api/user/newsletter-confirm', {
        method: 'GET',
    });
    return await res.json();
}

export async function suggestJobs(data: any) {

    console.log("data", data);


    let originQuery = [...data.currentLocatedin.split(", "), data.jobTitle, data.locatedin, ...data.skill]

    if (data.jobalertsetting === undefined) {

        if (!data.userId) {
            console.log("userId", [...data.currentLocatedin.split(", ")]);

            const response = await axios.post(
                `${host}/indexes/${indexName}/search`,
                {
                    q: `${[...data.currentLocatedin.split(", ")].join(" ")}`,
                    // q: "toronto canada",
                    limit: 15,
                    sort: ['postStatus:asc']
                },
                { headers: { 'Authorization': `Bearer ${apiKey}` } }
            );

            return response.data.hits

        } else {
            console.log("originQuery", originQuery);

            const response = await axios.post(
                `${host}/indexes/${indexName}/search`,
                {
                    // q: `${originQuery.join(" ")}`,
                    q: `${[...data.currentLocatedin.split(", ")].join(" ")}`,
                    limit: 15,
                    sort: ['postStatus:asc']
                },
                { headers: { 'Authorization': `Bearer ${apiKey}` } }
            );

            return response.data.hits
        }
    } else {

        // let skillSetFilter = data.skillSet.map((itme: any) => { return `skills = "${itme}"`; })

        let real = data.jobalertsetting.bufferList.map((item: any) => item.titleList)
        let titleList = real.reduce((acc: any, curr: any) => acc.concat(curr), []);

        let queryList = [...new Set([...originQuery, ...titleList])]

        console.log("queryList", queryList);


        const response = await axios.post(
            `${host}/indexes/${indexName}/search`,
            {
                // q: queryList.join(" "),
                q: `${[...data.currentLocatedin.split(", ")].join(" ")}`,
                // filter: [
                //     [...skillSetFilter],
                //     `city = "${cityInfo}"`,
                //     'postStatus = 2 OR postStatus = 3'
                // ],
                showRankingScore: true,
                limit: 20,
                sort: ['postStatus:asc']
            },
            { headers: { 'Authorization': `Bearer ${apiKey}` } }
        );

        return response.data.hits
    }

}