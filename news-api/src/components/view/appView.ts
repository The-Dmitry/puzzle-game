import ArticleResponse from '../../models/interfaces/ArticleResponse';
import NewsSource from '../../models/interfaces/NewsSource';
import NewsSourceResponse from '../../models/interfaces/NewsSourceResponse';
import News from './news/news';
import Sources from './sources/sources';

export class AppView {
  private news: News;

  private sources: Sources;

  private sourcesList: NewsSource[] | null = null;

  constructor() {
    this.news = new News();
    this.sources = new Sources();
  }

  public drawNews(data: ArticleResponse) {
    const values = data.articles ? data.articles : [];
    this.news.draw(values);
  }

  public drawSources(data: NewsSourceResponse, callback: (data: NewsSource[]) => void) {
    const values = data.sources ? data.sources : [];
    this.sourcesList = values;
    this.sources.draw(values);
    callback(this.sourcesList);
  }

  public drawFilteredSources(char: string) {
    if (this.sourcesList) {
      char === 'all'
        ? this.sources.draw(this.sourcesList)
        : this.sources.draw(this.sourcesList.filter((source) => source.name[0].toLowerCase() === char.toLowerCase()));
    }
  }
}

export default AppView;
