
export interface IGetNewsParams {
  page?: string;
  pageSize?: string;
  category?: string;
  sources: string | null;
  search: string;
  from?: string;
  to?: string;
}