import ArticleResponse from '../../models/interfaces/ArticleResponse';
import NewsSourceResponse from '../../models/interfaces/NewsSourceResponse';
import AppController from '../controller/controller';
import { AppView } from '../view/appView';

class App {
  private controller: AppController;

  private view: AppView;

  constructor() {
    this.controller = new AppController();
    this.view = new AppView();
  }

  public start() {
    document
      .querySelector('.sources')!
      .addEventListener('click', (e) =>
        this.controller.getNews(e, (data: ArticleResponse): void => this.view.drawNews(data))
      );
    this.controller.getSources((data: NewsSourceResponse): void => this.view.drawSources(data));
  }
}

export default App;
