import axios from 'axios';

const host = 'https://ms-1dd1c86bf47e-9385.nyc.meilisearch.io';
const apiKey = 'e6c3cf035914f999bc89bdc1c13aa1bcfb930fb2';
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

