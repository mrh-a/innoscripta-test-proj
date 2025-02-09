import { IGetNewsParams } from "../model/get-news-params.model";
import { IInitialSearchValues } from "../model/initial-search-values.model";

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

  console.log("-params---", params.to, params.from);

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
