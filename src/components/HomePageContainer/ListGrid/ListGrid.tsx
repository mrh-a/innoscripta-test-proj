import { FC, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router"
import useSearchQueryParams from "../../../core/hooks/use-search-query-params.hook";
import { useNewsAPIGetTopHeadlines } from "../../../core/api/news-api.api";
import ArticleCard from "../../common/ArticleCard/ArticleCard";
import { IOption } from "../../../core/model/option.model";
import Pagination from "../../common/Pagination/Pagination";

const sourcesOption: IOption[] = [];

interface IListGrid {}

const ListGrid: FC<IListGrid> = () => {

  const location = useLocation();
  const { dataSource, search, dateRange, category, sourceId } =
    useSearchQueryParams(location.search, sourcesOption);

  const { id: pageParam } = useParams<{ id: string }>();
  const currentPage = pageParam ? pageParam : "1";

  const { data, isLoading, refetch } = useNewsAPIGetTopHeadlines({
    category,
    dataSource,
    dateRange,
    search,
    sourceId,
    page: currentPage,
    pageSize: "10",
  });

  useEffect(() => {
    refetch();
  }, [currentPage, dataSource, search, dateRange, category, sourceId, refetch]);


  let totalPages = 0;
  
  if(data && data.data.totalResults){
    totalPages = data.data.totalResults;
  }

  const navigate = useNavigate();
  const searchParams = location.search;

  const onPageChange = (selected: number) => {
    console.log('--nav')
    navigate(`/pages/${selected}${searchParams}`);
  }

  return (
    <section>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-[20px]">
        {data?.data.articles.map((article) => (
          <ArticleCard
            description={article.description}
            href={article.url}
            image={article.urlToImage}
            title={article.title}
            key={article.url}
            author={article.author}
            date={article.publishedAt}
            source={article.source.name}
            category={""}
          />
        ))}
      </div>

      <Pagination
        page={+currentPage}
        pageSize={10}
        total={totalPages}
        onPageChange={onPageChange}
      />
    </section>
  );
};

export default ListGrid;
