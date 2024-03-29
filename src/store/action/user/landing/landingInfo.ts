import axios from 'axios';

const host = 'https://ms-25a464fc2474-8311.nyc.meilisearch.io';
const apiKey = 'a9af493c2f5076aad794cab8b668828cb8f1835f';
const indexName = 'title';

export async function carouselIndustry({ list }: any) {
    try {
        const One = await axios.post(
            `${host}/indexes/${indexName}/search`,
            {
                attributesToRetrieve: ["companyName", "companyLogo"],
                filter: `insightsV2 = "Hospitals and Health Care"`,
                facets: ["companyName"],
                limit: 1000
            },
            { headers: { 'Authorization': `Bearer ${apiKey}` } }
        );

        const oneSearchResults = One.data.hits;

        const oneUniqueCompanyNames = new Set();
        const oneUniqueCompanyData = [];

        oneSearchResults.forEach((result: any) => {
            if (!oneUniqueCompanyNames.has(result.companyName)) {
                oneUniqueCompanyNames.add(result.companyName);
                oneUniqueCompanyData.push({
                    companyName: result.companyName,
                    companyLogo: result.companyLogo,
                    count: One.data.facetDistribution.companyName[result.companyName]
                });
            }
        });

        const oneShuffledCompanyData = oneUniqueCompanyData.sort(() => Math.random() - 0.5);
        const oneRandomCompanyData = oneShuffledCompanyData.slice(0, 4);

        const Two = await axios.post(
            `${host}/indexes/${indexName}/search`,
            {
                attributesToRetrieve: ["companyName", "companyLogo"],
                filter: `insightsV2 = "Manufacturing"`,
                facets: ["companyName"],
                limit: 1000
            },
            { headers: { 'Authorization': `Bearer ${apiKey}` } }
        );

        const twoSearchResults = Two.data.hits;

        const twoUniqueCompanyNames = new Set();
        const twoUniqueCompanyData = [];

        twoSearchResults.forEach((result: any) => {
            if (!twoUniqueCompanyNames.has(result.companyName)) {
                twoUniqueCompanyNames.add(result.companyName);
                twoUniqueCompanyData.push({
                    companyName: result.companyName,
                    companyLogo: result.companyLogo,
                    count: Two.data.facetDistribution.companyName[result.companyName]
                });
            }
        });

        const twoShuffledCompanyData = twoUniqueCompanyData.sort(() => Math.random() - 0.5);
        const twoRandomCompanyData = twoShuffledCompanyData.slice(0, 4);


        return {
            isOkay: true,
            companyCount: 3,
            industryCount: 4,
            result: [
                {
                    category: "Hospitals and Health Care",
                    subResult: oneRandomCompanyData
                },
                {
                    category: "Manufacturing",
                    subResult: twoRandomCompanyData
                },
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
                facets: ['companyName', 'insightsV2'],
            },
            { headers: { 'Authorization': `Bearer ${apiKey}` } }
        );
        const { facetDistribution } = response.data;

        const companyCount = Object.keys(facetDistribution.companyName).length;
        const industryCount = Object.keys(facetDistribution.insightsV2).length;

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