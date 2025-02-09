import { useQuery } from "@tanstack/react-query";
import { Http } from "./interceptors/http.interceptor";
import { AxiosResponse } from "axios";
import { INewsApiSource } from "../model/news-api-source.model";
import useSearchQueryParams from "../hooks/use-search-query-params.hook";
import { EDataSouces } from "../enums/data-sources.enum";
import { generateNewsAPIORGParams } from "../utils/helpers.util";
import { INewsResponse } from "../model/news.model";

export const NewsAPIGetSources = (): Promise<AxiosResponse<INewsApiSource>> => {
  return Http.get(
    `https://newsapi.org/v2/top-headlines/sources?apiKey=${
      import.meta.env.VITE_NEWS_API_ORG_API_KEY
    }`
  );
};

export const NewsAPIGetTopHeadlines = (
  params: string
): Promise<AxiosResponse<INewsResponse>> => {
  return Http.get(`${params}`);
};

export const useNewsAPIGetSources = () =>
  useQuery({
    queryKey: ["NewsAPIGetSources"],
    queryFn: NewsAPIGetSources,
  });

export const useNewsAPIGetTopHeadlines = ({
  category,
  dataSource,
  dateRange,
  search,
  sourceId,
  page,
  pageSize,
}: Omit<ReturnType<typeof useSearchQueryParams>, "sources"> & {
  page?: string;
  pageSize?: string;
}) => {
  let queryParams = new URLSearchParams();
  let params = "";

  switch (dataSource.value) {
    case EDataSouces.NEWS_API_ORG:
      params =
        import.meta.env.VITE_NEWS_API_ORG_BASE_URL +
        "?" +
        generateNewsAPIORGParams(queryParams, {
          page,
          pageSize,
          category: category?.value,
          search,
          sources: sourceId,
          from: dateRange.startDate?.toDateString(),
          to: dateRange.endDate?.toDateString(),
        });
      break;

    default:
      break;
  }

  return useQuery({
    queryKey: ["NewsAPIGetTopHeadlines"],
    queryFn: () => NewsAPIGetTopHeadlines(params),
  });
};
