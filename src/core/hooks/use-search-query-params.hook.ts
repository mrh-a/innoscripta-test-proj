import { dataSources } from "../data/data-sources.data";
import { searchCategories } from "../data/categories.data";
import { IOption } from "../model/option.model";

import { useMemo } from "react";

const useSearchQueryParams = (query: string, sourcesOptions: IOption[]) => {
  const params = new URLSearchParams(query);

  const dataSourceParam = params.get("dataSource");
  const searchParam = params.get("search");
  const dateRangeParam = params.get("dateRange");
  const categoryParam = params.get("category");
  const sourcesParam = params.get("sources");

  let startDate: Date | null = null;
  let endDate: Date | null = null;
  if (dateRangeParam) {
    const [start, end] = dateRangeParam.split(",");
    startDate = new Date(start);
    endDate = new Date(end);
  }

  return useMemo(() => {
    return {
      dataSource:
        dataSources.find((ds) => ds.value === dataSourceParam) || dataSources[0],
      search: searchParam || "",
      dateRange: { startDate, endDate },
      category:
        searchCategories.find((cat) => cat.value === categoryParam) || null,
      sources: sourcesOptions.find((src) => src.value === sourcesParam) || null,
      sourceId: sourcesParam,
    };
  }, [
    dataSourceParam,
    searchParam,
    dateRangeParam,
    categoryParam,
    sourcesParam,
    sourcesOptions
  ]);
};


export default useSearchQueryParams;
