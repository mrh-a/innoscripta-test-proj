export interface INYTimesNews {
  abstract: string;
  web_url: string;
  snippet: string;
  lead_paragraph: string;
  print_page: string;
  source: string;
  multimedia: Multimedia[];
  headline: Headline;
  keywords: unknown[];
  pub_date: string;
  document_type: string;
  news_desk: string;
  section_name: string;
  byline: Byline;
  type_of_material: string;
  _id: string;
  word_count: number;
  uri: string;
}

interface Multimedia {
  rank: number;
  subtype: string;
  caption: string | null;
  credit: string | null;
  type: string;
  url: string;
  height: number;
  width: number;
  legacy: Record<string, unknown>;
  subType: string;
  crop_name: string;
}

interface Headline {
  main: string;
  kicker: string | null;
  content_kicker: string | null;
  print_headline: string;
  name: string | null;
  seo: string | null;
  sub: string | null;
}

interface Byline {
  original: string | null;
  person: unknown[];
  organization: string | null;
}

export interface INYTimesNewsResponse {
  response: {
    status: "ok";
    docs: INYTimesNews[];
    meta: {
      hits: number;
      offset: number;
      time: number;
    };
  };
}
