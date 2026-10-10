import newsData from "@/data/news.json";

export type NewsItem = {
  slug: string;
  title: string;
  date: string;
  dateLabel: string;
  category: string;
  summary: string;
  body: string[];
  links: { label: string; url: string }[];
  image?: { src: string; alt: string; width: number; height: number };
};

type NewsContent = {
  title: string;
  articleLabel: string;
  allNews: string;
  readMore: string;
  indexTitle: string;
  indexMetaTitle: string;
  indexIntro: string;
  back: string;
  linksTitle: string;
  more: string;
  items: NewsItem[];
};

export const news = newsData satisfies Record<string, NewsContent>;
