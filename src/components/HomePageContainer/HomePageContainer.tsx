import { FC } from "react";
import SearchBar from "./SearchBar/SearchBar";
import ListGrid from "./ListGrid/ListGrid";

interface IHomePageContainer {}

const HomePageContainer: FC<IHomePageContainer> = ({}) => {

  return (
    <div>
      <SearchBar />
      <ListGrid />
    </div>
  );
};

export default HomePageContainer;
