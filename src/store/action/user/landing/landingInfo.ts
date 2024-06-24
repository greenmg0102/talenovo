import axios from 'axios';

const host = 'https://ms-ce7a48ac689b-10562.nyc.meilisearch.io/';
const apiKey = '9fbe0270ada537d37c34e0f768ceed9fe2ae3b6b';
const indexName = 'title';

export async function paidJobGet() {

    const res = await fetch('https://talenovo.com/api/user/landing-job', {
        method: 'POST',
        body: JSON.stringify({})
    });

    return await res.json();
}

export async function carouselIndustry({ list }: any) {
    try {
        const One = await axios.post(
            `${host}/indexes/${indexName}/search`,
            {
                attributesToRetrieve: ["companyName", "companyLogo"],
                // filter: `insightsV2 = "Hospitals and Health Care"`,
                facets: ["companyName"],
                limit: 1000
            },
            { headers: { 'Authorization': `Bearer ${apiKey}` } }
        );

        const oneSearchResults = One.data.hits;

        const oneUniqueCompanyNames = new Set();
        const oneUniqueCompanyData: any = [];

        oneSearchResults.forEach((result: any) => {
            if (!oneUniqueCompanyNames.has(result.companyName) && (result.companyLogo !== undefined)) {

                oneUniqueCompanyNames.add(result.companyName);
                oneUniqueCompanyData.push({
                    companyName: result.companyName,
                    companyLogo: result.companyLogo
                });

            }
        });

        const oneShuffledCompanyData = oneUniqueCompanyData.sort(() => Math.random() - 0.5);
        const oneRandomCompanyData = oneShuffledCompanyData.slice(0, 18);

        const Two = await axios.post(
            `${host}/indexes/${indexName}/search`,
            {
                attributesToRetrieve: ["companyName", "companyLogo"],
                // filter: `insightsV2 = "Manufacturing"`,
                facets: ["companyName"],
                limit: 1000
            },
            { headers: { 'Authorization': `Bearer ${apiKey}` } }
        );

        const twoSearchResults = Two.data.hits;

        const twoUniqueCompanyNames = new Set();
        const twoUniqueCompanyData: any = [];

        twoSearchResults.forEach((result: any) => {
            if (!twoUniqueCompanyNames.has(result.companyName) && (result.companyLogo !== undefined)) {
                twoUniqueCompanyNames.add(result.companyName);
                twoUniqueCompanyData.push({
                    companyName: result.companyName,
                    companyLogo: result.companyLogo,
                });
            }
        });

        const twoShuffledCompanyData = twoUniqueCompanyData.sort(() => Math.random() - 0.5);
        const twoRandomCompanyData = twoShuffledCompanyData.slice(0, 18);


        return {
            isOkay: true,
            companyCount: 3,
            industryCount: 6,
            result: [
                {
                    category: "Featured Companies",
                    subResult: oneRandomCompanyData
                }
            ]
        }
    } catch (error) {
        return {
            isOkay: false,
            message: "Something is wrong!"
        }
    }
}


export async function landingInfo() {
    try {

        const response = await axios.post(
            `${host}/indexes/${indexName}/search`,
            {
                facets: ['companyName'],
                // facets: ['companyName', 'insightsV2'],
            },
            { headers: { 'Authorization': `Bearer ${apiKey}` } }
        );
        const { facetDistribution } = response.data;

        
        
        const companyCount = Object.keys(facetDistribution.companyName).length;
        const industryCount = 512;
        // const industryCount = Object.keys(facetDistribution.insightsV2).length;
        
        console.log("companyCount", companyCount);
        return {
            isOkay: true,
            companyCount: companyCount,
            industryCount: industryCount,
        }

    } catch (error) {
        return {
            isOkay: false,
            message: "Something is wrong!"
        }
    }
}
