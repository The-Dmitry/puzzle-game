import ArticleResponse from '../../models/interfaces/ArticleResponse';
import NewsSourceResponse from '../../models/interfaces/NewsSourceResponse';
import News from './news/news';
import Sources from './sources/sources';

export class AppView {
  private news: News;

  private sources: Sources;

  constructor() {
    this.news = new News();
    this.sources = new Sources();
  }

  public drawNews(data: ArticleResponse) {
    const values = data.articles ? data.articles : [];
    this.news.draw(values);
  }

  public drawSources(data: NewsSourceResponse) {
    const values = data.sources ? data.sources : [];
    this.sources.draw(values);
  }
}

export default AppView;
