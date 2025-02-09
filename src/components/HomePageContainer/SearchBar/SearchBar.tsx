import { Form, Formik } from "formik";
import { FC, useEffect, useMemo, useState } from "react";
import TextInput  from "../../common/TextInput/TextInput";
import Button from "../../common/Button/Button";
import DateRangePicker from "../../common/RangeDatePicker/RangeDatePicker";
import SelectOption from "../../common/SelectOption/SelectOption";
import { searchCategories } from "../../../core/data/categories.data";
import { useNewsAPIGetSources } from "../../../core/api/news-api.api";
import { INewsSource } from "../../../core/model/news-api-source.model";
import { dataSources } from "../../../core/data/data-sources.data";
import { useNavigate } from "react-router";
import useSearchQueryParams from "../../../core/hooks/use-search-query-params.hook";
import { IInitialSearchValues } from "../../../core/model/initial-search-values.model";
import { generateSearchQueryParams } from "../../../core/utils/helpers.util";

interface ISearchBar {}

const SearchBar: FC<ISearchBar> = ({}) => {
  
  const navigate = useNavigate()

  const [initialValues, setInitialValues] = useState<IInitialSearchValues>({
    dataSource: dataSources[0],
    search: "",
    dateRange: { startDate: null, endDate: null },
    category: null,
    sources: null,
  });

  const { isLoading, data } = useNewsAPIGetSources();

  const normalizeSourcesOptions = useMemo(() => {
    if (data && data.data.status === "ok") {
      const newSource = data.data.sources.map((data: INewsSource) => ({
        label: data.name,
        value: data.id,
      }));

      return newSource;
    }

    return [];
  }, [data]);

  const { dataSource, search, dateRange, category, sources } =
    useSearchQueryParams(location.search, normalizeSourcesOptions);

  useEffect(() => {
    setInitialValues({
      dataSource,
      search,
      dateRange,
      category,
      sources,
    });
  }, [dataSource, search, category, sources]);

  const onSubmit = (values: IInitialSearchValues) => {
    let queryParams = new URLSearchParams();
    queryParams = generateSearchQueryParams(queryParams, values);
    navigate(`?${queryParams.toString()}`);
  }; 

  return (
    <section className="flex justify-start  mt-[20px]">
      <Formik<IInitialSearchValues>
        initialValues={initialValues}
        onSubmit={onSubmit}
        enableReinitialize={true}
      >
        {({}) => (
          <Form className="flex gap-[10px] flex-wrap items-center">
            <SelectOption
              isLoading={false}
              placeholder="data source"
              name="dataSource"
              label="Data Source"
              options={dataSources}
              isClearable={false}
            />
            <TextInput
              name="search"
              label="Search"
              placeholder="search ..."
              inputClassName="min-w-[450px]"
            />
            <DateRangePicker label="Date" name="dateRange" />
            <SelectOption
              placeholder="category"
              name="category"
              label="Category"
              options={searchCategories}
              isClearable
            />
            <SelectOption
              isLoading={isLoading}
              placeholder="sources"
              name="sources"
              label="Sources"
              options={normalizeSourcesOptions}
              isClearable
            />
            <Button
              className="mt-[29px]"
              label="Search"
              ariaLabel="Submit Search Form"
            />
          </Form>
        )}
      </Formik>
    </section>
  );
}

export default SearchBar;