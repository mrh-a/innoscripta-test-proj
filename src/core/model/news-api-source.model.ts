export interface INewsApiSource {
  status: string;
  sources: INewsSource[];
}

export interface INewsSource {
  id: string;
  name: string;
  description: string;
  url: string;
  category: string;
  language: string;
  country: string;
};