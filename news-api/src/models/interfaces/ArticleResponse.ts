import Article from './Article';

export default interface ArticleResponse {
  status: string;
  totalResults: number;
  articles: Article[];
}
