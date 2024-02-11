import Loader from './loader';

class AppLoader extends Loader {
  constructor() {
    super('https://newsapi.org/v2/', {
      apiKey: 'cb926c60892c4ad28d14b9fda792e46a', // получите свой ключ https://newsapi.org/
    });
  }
}

export default AppLoader;
