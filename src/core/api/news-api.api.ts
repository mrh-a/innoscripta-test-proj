import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { Http } from "./interceptors/http.interceptor";
import { INewsApiSource } from "../model/news-api-source.model";
import useSearchQueryParams from "../hooks/use-search-query-params.hook";
import { EDataSouces } from "../enums/data-sources.enum";
import { generateGuardianParams, generateNewsAPIORGParams } from "../utils/helpers.util";
import { INewsResponse } from "../model/news.model";
import { IGuardianNewsResponse } from "../model/guardian.model";
import { getNormalizedTotalResult } from "../utils/helpers.util"; // import your normalization function

export const NewsAPIGetSources = (): Promise<AxiosResponse<INewsApiSource>> => {
  return Http.get(
    `https://newsapi.org/v2/top-headlines/sources?apiKey=${
      import.meta.env.VITE_NEWS_API_ORG_API_KEY
    }`
  );
};

export const NewsAPIGetTopHeadlines = (
  params: string
): Promise<AxiosResponse<INewsResponse & IGuardianNewsResponse>> => {
  return Http.get(`${params}`);
};

export const useNewsAPIGetSources = () =>
  useQuery({
    queryKey: ["NewsAPIGetSources"],
    queryFn: NewsAPIGetSources,
    retry: 1,
    refetchOnWindowFocus: false,
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
          from: dateRange.startDate?.toISOString().split("T")[0],
          to: dateRange.endDate?.toISOString().split("T")[0],
        });
      break;

    case EDataSouces.GUARDIAN:
      params =
        import.meta.env.VITE_GURADIAN_BASE_URL +
        "?" +
        generateGuardianParams(queryParams, {
          page,
          pageSize,
          category: category?.value,
          search,
          sources: sourceId,
          from: dateRange.startDate?.toISOString().split("T")[0],
          to: dateRange.endDate?.toISOString().split("T")[0],
        });
      break;

    default:
      break;
  }

  return useQuery({
    queryKey: ["NewsAPIGetTopHeadlines", { dataSource }],
    queryFn: () => NewsAPIGetTopHeadlines(params),
    select: (
      response: AxiosResponse<INewsResponse & IGuardianNewsResponse>
    ) => {
      return getNormalizedTotalResult(
        dataSource.value || EDataSouces.NEWS_API_ORG,
        response.data
      );
    },
    retry: false,
    refetchOnWindowFocus: false,
  });
};
