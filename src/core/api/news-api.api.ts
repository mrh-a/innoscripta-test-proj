import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { Http } from "./interceptors/http.interceptor";
import { INewsApiSource } from "../model/news-api-source.model";
import useSearchQueryParams from "../hooks/use-search-query-params.hook";
import { EDataSouces } from "../enums/data-sources.enum";
import {
  generateGuardianParams,
  generateNewsAPIORGParams,
  generateNYTimesParams,
} from "../utils/helpers.util";
import { INewsResponse } from "../model/news.model";
import { IGuardianNewsResponse } from "../model/guardian.model";
import { getNormalizedResult } from "../utils/helpers.util"; // import your normalization function
import { INYTimesNewsResponse } from "../model/ny-times.model";

export const NewsAPIGetSources = (): Promise<AxiosResponse<INewsApiSource>> => {
  return Http.get(
    `${import.meta.env.VITE_NEWS_API_ORG_BASE_URL}/sources?apiKey=${
      import.meta.env.VITE_NEWS_API_ORG_API_KEY
    }`
  );
};

export const NewsAPIGetTopHeadlines = (
  params: string
): Promise<
  AxiosResponse<INewsResponse & IGuardianNewsResponse & INYTimesNewsResponse>
> => {
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
        "/search" +
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

    case EDataSouces.NYTIMES:
      params =
        import.meta.env.VITE_NYTIMES_BASE_URL +
        "?" +
        generateNYTimesParams(queryParams, {
          page,
          pageSize,
          category: category?.value,
          search,
          sources: sourceId,
          from: dateRange.startDate
            ?.toISOString()
            .split("T")[0]
            .replace(/-/g, ""),
          to: dateRange.endDate?.toISOString().split("T")[0].replace(/-/g, ""),
        });
      break;

    default:
      break;
  }

  return useQuery({
    queryKey: ["NewsAPIGetTopHeadlines", { dataSource }],
    queryFn: () => NewsAPIGetTopHeadlines(params),
    select: (
      response: AxiosResponse<
        INewsResponse & IGuardianNewsResponse & INYTimesNewsResponse
      >
    ) => {
      return getNormalizedResult(
        dataSource.value || EDataSouces.NEWS_API_ORG,
        response.data
      );
    },
    retry: false,
    refetchOnWindowFocus: false,
  });
};
