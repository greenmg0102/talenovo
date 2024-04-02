import axios from 'axios';

const host = 'https://ms-d932cad3594f-8320.sfo.meilisearch.io';
const apiKey = '45679470fdc94d8c90ef03712354389f8d209067';
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

