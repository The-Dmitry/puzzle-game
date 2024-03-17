import './mainView.scss';
import View from '../common/view/VIew';
import LoginPageView from '../loginPage/LoginPageView';
import StartScreenView from '../startScreen/StartScreenView';
import GamePageView from '../gamePage/gamePageView';
import HttpClient from '../common/httpClient/HttpClient';
import wordCollection from '../../data/wordCollection';
import { WordCollection } from '../../interfaces/WordCollection';

export default class MainView extends View {
  private activePage: View | null = null;

  private httpClient = new HttpClient();

  private collection: WordCollection[] = [];

  constructor() {
    super({
      tag: 'div',
      css: ['app'],
    });
    this.configureView();
    this.getAllJson(wordCollection);
  }

  private configureView() {
    this.state.subscribe(this.viewCreator, 'loginData', (v) => {
      if (!v) {
        this.render(new LoginPageView());
        this.state.clearState();
        return;
      }
      this.render(new StartScreenView(() => this.render(new GamePageView(this.collection))));
    });
  }

  private render(page: View) {
    if (this.collection.length) {
      this.state.next('collectionLoaded', () => true);
    }
    this.activePage?.remove();
    this.activePage = page;
    this.addNodeInside(this.activePage);
  }

  public async getAllJson(urls: string[]) {
    this.state.next('collectionLoaded', () => false);
    const result = await Promise.all(urls.map((url) => this.httpClient.fetch<WordCollection>(url)));
    this.collection = result;
    this.state.next('collectionLoaded', () => true);
  }
}
