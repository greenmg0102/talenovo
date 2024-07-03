import axios from 'axios';

const host = 'https://search.talenovo.com';
const apiKey = '47dfe734-68fb-4b19-a96f-5f19a3355458';
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

    let originQuery = [...data.currentLocatedin.split(", "), data.jobTitle, data.locatedin, ...data.skill]

    if (data.jobalertsetting === undefined) {

        if (!data.userId) {
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