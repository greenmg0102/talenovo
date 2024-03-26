import axios from 'axios';

const host = 'https://ms-25a464fc2474-8311.nyc.meilisearch.io';
const apiKey = 'a9af493c2f5076aad794cab8b668828cb8f1835f';
const indexName = 'title';

export async function getfacetedIndustry() {

    const response = await axios.post(
        `${host}/indexes/${indexName}/search`,
        { facets: ['insightsV2'] },
        { headers: { 'Authorization': `Bearer ${apiKey}` } }
    );
    const { facetDistribution } = response.data;

    return Object.keys(facetDistribution.insightsV2)
}

