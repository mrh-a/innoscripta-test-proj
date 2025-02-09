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
import { generateSearchQueryParams, getSourceSelectOptionLabel, getSourceSelectOptions, removeFilter, saveFilter } from "../../../core/utils/helpers.util";
import { EDataSouces } from "../../../core/enums/data-sources.enum";
import { IOption } from "../../../core/model/option.model";
import SavedSearchItemWithRemove from "./SavedSearchItemWithRemove/SavedSearchItemWithRemove";
import { toast } from "react-toastify";
import { useGuardianGetSections } from "../../../core/api/guardian-sections.api";
import { IGuardianSection } from "../../../core/model/guardian-section.model";

interface ISearchBar {}

const SearchBar: FC<ISearchBar> = ({}) => {
  
  const navigate = useNavigate()

  const [savedFilters, setSavedFilters] = useState<IOption[]>([]);
  const [initialValues, setInitialValues] = useState<IInitialSearchValues>({
    dataSource: dataSources[0],
    search: "",
    dateRange: { startDate: null, endDate: null },
    category: null,
    sources: null,
  });

  const { isLoading, data } = useNewsAPIGetSources();
  const { isLoading: sectionsIsLoading, data: sectionsData } =
    useGuardianGetSections();

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

  const normalizeSectionsOptions = useMemo(() => {
    if (sectionsData && sectionsData.data.response.status === "ok") {
      const newSource = sectionsData.data.response.results.map(
        (data: IGuardianSection) => ({
          label: data.webTitle,
          value: data.id,
        })
      );

      return newSource;
    }
    return [];
  }, [sectionsData]);


  console.log("--normalizeSectionsOptions--", normalizeSectionsOptions);
  const { dataSource, search, dateRange, category, sources } =
    useSearchQueryParams(
      location.search,
      normalizeSourcesOptions,
      normalizeSectionsOptions
    );

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
    navigate(`/?${queryParams.toString()}`);
  }; 

  useEffect(() => {
    const savedFiltersStr = localStorage.getItem("savedFilters");
    if (savedFiltersStr) {
      setSavedFilters(JSON.parse(savedFiltersStr));
    }
  }, []);

  const handleSavedSearchChange = (selectedOption: IOption | null) => {
    if (selectedOption) {
      navigate(`/?${selectedOption.value}`);
    }
  };

  return (
    <section className="flex justify-start  mt-[20px]">
      <Formik<IInitialSearchValues>
        initialValues={initialValues}
        onSubmit={onSubmit}
        enableReinitialize={true}
      >
        {({ setFieldValue, values }) => (
          <Form>
            <div className="flex gap-[10px] flex-wrap items-center">
              <SelectOption
                isLoading={false}
                placeholder="data source"
                name="dataSource"
                label="Data Source"
                options={dataSources}
                onChange={() => setFieldValue("sources", null)}
                isClearable={false}
              />
              <TextInput
                name="search"
                label="Search"
                placeholder="search ..."
                inputClassName="min-w-[450px]"
              />
              <DateRangePicker label="Date" name="dateRange" />
              {values["dataSource"].value === EDataSouces.NEWS_API_ORG && (
                <SelectOption
                  placeholder="category"
                  name="category"
                  label="Category"
                  options={searchCategories}
                  onChange={() => {
                    if (
                      values["dataSource"] &&
                      values["dataSource"].value === EDataSouces.NEWS_API_ORG
                    ) {
                      setFieldValue("sources", null);
                    }
                  }}
                  isClearable
                />
              )}
              <SelectOption
                isLoading={isLoading}
                placeholder={getSourceSelectOptionLabel(
                  values["dataSource"].value
                )}
                name="sources"
                label={getSourceSelectOptionLabel(values["dataSource"].value)}
                onChange={() => {
                  if (
                    values["dataSource"] &&
                    values["dataSource"].value === EDataSouces.NEWS_API_ORG
                  ) {
                    setFieldValue("category", null);
                  }
                }}
                options={getSourceSelectOptions(
                  values["dataSource"].value,
                  normalizeSourcesOptions,
                  normalizeSectionsOptions
                )}
                isClearable
              />
              <Button
                className="mt-[29px]"
                label="Search"
                ariaLabel="Submit Search Form"
              />
            </div>
            <div className="flex gap-[10px] flex-wrap items-center mt-[10px]">
              <SelectOption
                isLoading={false}
                placeholder="select ..."
                name="savedSearch"
                label="Saved Search"
                className="min-w-[350px]"
                onChange={(opt: IOption) => {
                  handleSavedSearchChange(opt);
                }}
                options={savedFilters}
                isClearable
                CustomOptionComponent={SavedSearchItemWithRemove}
                onItemDelete={(opt: any) => {
                  removeFilter(opt, setSavedFilters);
                  toast.success("Item Successfully Removed.", {
                    position: "top-center",
                  });
                }}
              />
              <Button
                type="button"
                className="mt-[29px]"
                label="Save Search"
                ariaLabel="Save current filters"
                onClick={() => {
                  saveFilter(values, setSavedFilters);
                  toast.success("Item Successfully Saved.", {
                    position: "top-center",
                  });
                }}
              />
            </div>
          </Form>
        )}
      </Formik>
    </section>
  );
}

export default SearchBar;