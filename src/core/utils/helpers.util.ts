import { Dispatch } from "react";
import { IGetNewsParams } from "../model/get-news-params.model";
import { IInitialSearchValues } from "../model/initial-search-values.model";
import { IOption } from "../model/option.model";
import { EDataSouces } from "../enums/data-sources.enum";
import { INews, INewsResponse } from "../model/news.model";
import { IGuardianNewsResponse } from "../model/guardian.model";

export const generateSearchQueryParams = (
  queryParams: URLSearchParams,
  values: IInitialSearchValues
) => {
  if (values.dataSource && values.dataSource.value) {
    queryParams.append("dataSource", values.dataSource.value);
  }
  if (values.search) {
    queryParams.append("search", values.search);
  }
  if (
    values.dateRange &&
    values.dateRange.startDate &&
    values.dateRange.endDate
  ) {
    const startDate = values.dateRange.startDate.toISOString();
    const endDate = values.dateRange.endDate.toISOString();
    queryParams.append("dateRange", `${startDate},${endDate}`);
  }
  if (values.category && values.category.value) {
    queryParams.append("category", values.category.value);
  }
  if (values.sources && values.sources.value) {
    queryParams.append("sources", values.sources.value);
  }

  return queryParams;
};

export const generateNewsAPIORGParams = (
  queryParams: URLSearchParams,
  params: IGetNewsParams
) => {
  queryParams.append("page", params.page || "1");
  queryParams.append("pageSize", params.pageSize || "10");
  queryParams.append("language", "en");

  if (params.category) {
    queryParams.append("category", params.category);
  }
  if (params.sources) {
    queryParams.append("sources", params.sources);
  }
  if (params.search) {
    queryParams.append("q", params.search);
  }
  if (params.from) {
    queryParams.append("from", params.from);
  }
  if (params.to) {
    queryParams.append("to", params.to);
  }

  queryParams.append("apiKey", import.meta.env.VITE_NEWS_API_ORG_API_KEY);

  return queryParams;
};

export const generateGuardianParams = (
  queryParams: URLSearchParams,
  params: IGetNewsParams
) => {
  queryParams.append("page", params.page || "1");
  queryParams.append("pageSize", params.pageSize || "10");

  if (params.search) {
    queryParams.append("q", params.search);
  }
  if (params.from) {
    queryParams.append("from-date", params.from);
  }
  if (params.to) {
    queryParams.append("to-date", params.to);
  }
  if (params.sources) {
    queryParams.append("section", params.sources);
  }

  queryParams.append("api-key", import.meta.env.VITE_GURADIAN_API_KEY);

  return queryParams;
};

export const saveFilter = (
  values: IInitialSearchValues,
  setSavedFilters: Dispatch<React.SetStateAction<IOption[]>>
) => {
  let queryParams = new URLSearchParams();
  queryParams = generateSearchQueryParams(queryParams, values);
  const filterQueryString = queryParams.toString();

  const newSavedFilter: IOption = {
    label: `Saved Filter ${new Date().toLocaleString()}`,
    value: filterQueryString,
  };

  const existingSavedFilters = localStorage.getItem("savedFilters");
  let filtersArray: IOption[] = existingSavedFilters
    ? JSON.parse(existingSavedFilters)
    : [];

  filtersArray.push(newSavedFilter);
  localStorage.setItem("savedFilters", JSON.stringify(filtersArray));
  setSavedFilters(filtersArray);
};

export const removeFilter = (
  filterToRemove: IOption,
  setSavedFilters: Dispatch<React.SetStateAction<IOption[]>>
) => {
  const existingSavedFilters = localStorage.getItem("savedFilters");
  let filtersArray: IOption[] = existingSavedFilters
    ? JSON.parse(existingSavedFilters)
    : [];
  filtersArray = filtersArray.filter(
    (filter: IOption) => filter.value !== filterToRemove.value
  );

  localStorage.setItem("savedFilters", JSON.stringify(filtersArray));
  setSavedFilters(filtersArray);
};

// We are considering the NEWS API ORG response as the default and normalizing the Guardian and NYTimes response.
export const getNormalizedTotalResult = (
  dataSource: string,
  data: INewsResponse & IGuardianNewsResponse
) => {
  let normalizedData: INewsResponse = {
    articles: [],
    status: "ok",
    totalResults: 0,
  };

  if (dataSource === EDataSouces.NEWS_API_ORG) {
    return data;
  } else if (dataSource === EDataSouces.GUARDIAN) {
    normalizedData.status = "ok";
    normalizedData.totalResults = data.response.total;
    let articles: INews[] = data.response.results.map((news) => ({
      author: "",
      content: "",
      description: "",
      publishedAt: news.webPublicationDate,
      source: { id: news.sectionId, name: news.sectionName },
      title: news.webTitle,
      url: news.webUrl,
      urlToImage: "",
    }));

    normalizedData.articles = articles;

    return normalizedData;
  }
};

export const getSourceSelectOptionLabel = (dataSource: string) => {
  switch (dataSource) {
    case EDataSouces.GUARDIAN:
      return "Section";

    case EDataSouces.NEWS_API_ORG:
      return "Sources";

    default:
      return "Sources";
  }
};

export const getSourceSelectOptions = (
  dataSource: string | null,
  newsApiData: IOption[],
  guardianData: IOption[]
) => {
  switch (dataSource) {
    case EDataSouces.GUARDIAN:
      return guardianData;

    case EDataSouces.NEWS_API_ORG:
      return newsApiData;

    default:
      return newsApiData;
  }
};