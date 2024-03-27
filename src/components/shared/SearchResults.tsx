import { Models } from "appwrite";
import { Loader2 } from "lucide-react";
import GridPostList from "./GridPostList";

type SearchResultsProps = {
  isSearchFetching: boolean;
  searchedPosts: Models.Document[];
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

  if (searchedPosts && searchedPosts.documents.length > 0) {
    return <GridPostList posts={searchedPosts.documents} />;
  }

  return (
    <p className="text-light-4 mt-10 text-center w-full">No Results Found</p>
  );
};

export default SearchResults;
