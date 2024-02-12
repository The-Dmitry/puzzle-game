import ArticleResponse from '../../models/interfaces/ArticleResponse';
import NewsSourceResponse from '../../models/interfaces/NewsSourceResponse';
import AppController from '../controller/controller';
import SourceFilter from '../view/sources-filter/sourceFilter';
import { AppView } from '../view/appView';
import NewsSource from '../../models/interfaces/NewsSource';

class App {
  private controller: AppController;

  private view: AppView;

  private filter: SourceFilter;

  constructor() {
    this.controller = new AppController();
    this.view = new AppView();
    this.filter = new SourceFilter();
  }

  public start() {
    document
      .querySelector('.sources')!
      .addEventListener('click', (e) =>
        this.controller.getNews(e, (data: ArticleResponse): void => this.view.drawNews(data))
      );
    this.controller.getSources((data: NewsSourceResponse): void => {
      this.view.drawSources(data, (data: NewsSource[]) =>
        this.filter.draw(data, (char: string) => this.view.drawFilteredSources(char))
      );
    });
  }
}

export default App;
