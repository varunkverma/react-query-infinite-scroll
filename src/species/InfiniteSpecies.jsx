import React from "react";
import InfiniteScroll from "react-infinite-scroller";
import { useInfiniteQuery } from "react-query";
import { Species } from "./Species";

const initialUrl = "https://swapi.dev/api/species/";
const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};

export function InfiniteSpecies() {
  // TODO: get data for InfiniteScroll via React Query
  const {
    data,
    isLoading,
    isFetching,
    error,
    isError,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery(
    "sw-species",
    ({ pageParam = initialUrl }) => fetchUrl(pageParam),
    {
      getNextPageParam: (lastPage) => lastPage.next || undefined,
    }
  );

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }
  if (isError) {
    return <div>Error: {error.toString()}</div>;
  }

  return (
    <>
      {isFetching && <div className="loading">Loading...</div>}
      <InfiniteScroll hasMore={hasNextPage} loadMore={fetchNextPage}>
        {data &&
          data.pages &&
          data.pages.map((speciesData) => {
            return speciesData.results.map((species) => {
              const { name, language, averageLifespan } = species;
              return (
                <Species
                  name={name}
                  key={name}
                  averageLifespan={averageLifespan}
                  language={language}
                />
              );
            });
          })}
      </InfiniteScroll>
    </>
  );
}
