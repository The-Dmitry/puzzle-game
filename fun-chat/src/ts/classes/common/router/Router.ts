import NotFoundView from '../../notFoundVIew/NotFoundVIew';
import View from '../view/View';
import { Routes } from './Routes';

export default class Router {
  private routes: Map<string, View>;

  private origin = window.location.origin;

  private currentPath = '';

  private render: (view: View, href: string) => void;

  constructor(routes: [string, View][], render: (view: View, href: string) => void) {
    this.routes = new Map(routes);
    this.render = render;
    this.listen();
  }

  private listen() {
    setInterval(() => {
      const path = window.location.href.replace(this.origin, '');
      if (this.currentPath !== path) {
        this.navigate(path);
      }
    }, 50);
  }

  private navigate(path: string) {
    if (this.routes.has(path)) {
      this.render(this.routes.get(path)!, path);
      this.currentPath = path;
      return;
    }
    if (path === '/') {
      window.history.replaceState(null, '', Routes.garage);
      this.navigate(Routes.garage);
      return;
    }
    window.history.pushState(null, '', Routes.notFound);
    this.currentPath = Routes.notFound;
    this.render(new NotFoundView(), '');
  }
}
