import { EDataSouces } from "../enums/data-sources.enum";
import { IOption } from "../model/option.model";

export const dataSources: IOption[] = [
  { value: EDataSouces.NEWS_API_ORG, label: "News API ORG" },
  { value: EDataSouces.GUARDIAN, label: "The Guardian" },
  { value: EDataSouces.NYTIMES, label: "NY Times" },
]; 