// import "instantsearch.css/themes/algolia-min.css";
import { instantMeiliSearch } from "@meilisearch/instant-meilisearch";
import JobCard from "@/components/Hero/job/jobCard";



export default function MeiliSearch() {

    return (
        <div className="w-full">
            <InstantSearch
                indexName="title"
                searchClient={searchClient}
            >
                <div className="flex justify-center items-center mb-4">
                    <SearchBox />
                </div>

                <div className="flex justify-between items-start">
                    <div className="w-1/4">
                        <ClearRefinements />
                        {/* <SortBy
                            defaultRefinement="title"
                            items={[
                                { value: "title", label: "Relevant" },
                                {
                                    value: "title:recommendationCount:desc",
                                    label: "Most Recommended"
                                },
                                {
                                    value: "title:recommendationCount:asc",
                                    label: "Least Recommended"
                                }
                            ]}
                        /> */}

                        <h2>location</h2>
                        <RefinementList attribute="location" />
                        <h2>companyName</h2>
                        <RefinementList attribute="companyName" />
                        {/* <Configure
                        hitsPerPage={6}
                        attributesToSnippet={["description:50"]}
                        snippetEllipsisText={"..."}
                        /> */}
                    </div>
                    <div className="w-3/4">
                        <div className="mb-4">
                            <Hits hitComponent={Hit} />
                        </div>
                        <Pagination showLast={true} />
                    </div>
                </div>
            </InstantSearch>
        </div>
    )
}

