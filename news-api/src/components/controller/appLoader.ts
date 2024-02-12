import Loader from './loader';

class AppLoader extends Loader {
  constructor() {
    super('https://newsapi.org/v2/', {
      apiKey: '5aec5d1a5f1d4466b0227a771247f9ef', // получите свой ключ https://newsapi.org/
    });
  }
}

export default AppLoader;
