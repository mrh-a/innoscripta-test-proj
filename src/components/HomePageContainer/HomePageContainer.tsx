import { FC } from "react";
import SearchBar from "./SearchBar/SearchBar";
import ListGrid from "./ListGrid/ListGrid";
import { useParams } from "react-router";

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
