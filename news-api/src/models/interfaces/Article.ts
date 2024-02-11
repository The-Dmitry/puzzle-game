import NewsSource from './NewsSource';

export default interface Article {
  source: Pick<NewsSource, 'id' | 'name'>;
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}
