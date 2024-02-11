import { Endpoint } from '../../models/enums/Endpoint';
import AppLoader from './appLoader';

class AppController extends AppLoader {
  public getSources<T>(callback: (data: T) => void) {
    super.getResp(
      {
        endpoint: Endpoint.sources,
      },
      callback
    );
  }

  public getNews<U>(e: Event, callback: (data: U) => void) {
    let target = e.target as HTMLElement;
    const newsContainer = e.currentTarget as HTMLElement;

    while (target !== newsContainer) {
      if (target.classList.contains('source__item')) {
        const sourceId = target.getAttribute('data-source-id') as string;
        if (newsContainer.getAttribute('data-source') !== sourceId) {
          newsContainer.setAttribute('data-source', sourceId);
          super.getResp(
            {
              endpoint: Endpoint.everything,
              options: {
                sources: sourceId,
              },
            },
            callback
          );
        }
        return;
      }
      target = target.parentNode as HTMLElement;
    }
  }
}

export default AppController;
