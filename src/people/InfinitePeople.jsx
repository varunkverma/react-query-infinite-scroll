import React from "react";
import InfiniteScroll from "react-infinite-scroller";
import { useInfiniteQuery } from "react-query";
import { Person } from "./Person";

const initialUrl = "https://swapi.dev/api/people/";
const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};

export function InfinitePeople() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetching,
    isError,
    error,
  } = useInfiniteQuery(
    "sw-people",
    ({ pageParam = initialUrl }) => fetchUrl(pageParam),
    {
      getNextPageParam: (lastPage) => lastPage.next || undefined,
    }
  );
  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }
  if (isError) {
    return <div>Error! {error.toString()}</div>;
  }

  return (
    <>
      {isFetching && <div className="loading">Loading...</div>}
      <InfiniteScroll loadMore={fetchNextPage} hasMore={hasNextPage}>
        {data &&
          data.pages &&
          data.pages.map((pd) => {
            return pd.results.map((person) => {
              const { name, hair_color, eye_color } = person;
              return (
                <Person
                  key={name}
                  name={name}
                  eyeColor={eye_color}
                  hairColor={hair_color}
                />
              );
            });
          })}
      </InfiniteScroll>
    </>
  );
}
