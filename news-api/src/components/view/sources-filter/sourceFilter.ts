import './sourcesFilter.css';
import NewsSource from '../../../models/interfaces/NewsSource';

export default class SourceFilter {
  public draw(data: NewsSource[], callback: (letter: string) => void) {
    const chars = new Set();
    data.forEach((item) => chars.add(item.name[0].toUpperCase()));
    const buttons = [
      this.createButton('all', callback),
      ...([...chars] as string[]).map((char) => this.createButton(char, callback)),
    ];

    document.querySelector('.sources-filter')!.append(...buttons);
  }

  private createButton(char: string, callback: (letter: string) => void) {
    const btn = document.createElement('button');
    btn.className = 'sources-filter__button';
    btn.textContent = char;
    btn.addEventListener('click', () => {
      callback(char);
    });
    return btn;
  }
}
