/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Models } from "appwrite";
import { Loader2 } from "lucide-react";
import GridPostList from "./GridPostList";

type SearchResultsProps = {
  isSearchFetching: boolean;
  searchedPosts: Models.Document[] | undefined;
};
const SearchResults = ({
  isSearchFetching,
  searchedPosts,
}: SearchResultsProps) => {
  if (isSearchFetching) {
    return (
      <div className="w-full flex items-center justify-center">
        <Loader2 className="w-8 h-8 opacity-75 animate-spin" />
      </div>
    );
  }

  //@ts-ignore
  if (searchedPosts && searchedPosts.documents.length > 0) {
    //@ts-ignore
    return <GridPostList posts={searchedPosts.documents} />;
  }

  return (
    <p className="text-light-4 mt-10 text-center w-full">No Results Found</p>
  );
};

export default SearchResults;
