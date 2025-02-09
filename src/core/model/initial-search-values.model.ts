import { IOption } from "./option.model";

export interface IInitialSearchValues {
  dataSource: IOption;
  search: string;
  dateRange: { startDate: Date | null; endDate: Date | null };
  category: IOption | null;
  sources: IOption | null;
}