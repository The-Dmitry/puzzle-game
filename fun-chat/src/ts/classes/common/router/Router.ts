import { Routes } from './Routes';

export default class Router {
  private origin = window.location.origin;

  private currentPath = '';

  constructor(private readonly routes: Map<string, () => Promise<void>>) {
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
    if (path === '/') {
      window.history.replaceState(null, '', Routes.AUTHORIZATION);
      this.navigate(Routes.AUTHORIZATION);
      return;
    }
    if (this.routes.has(path)) {
      this.routes.get(path)!();
      this.currentPath = path;
      return;
    }
    window.history.pushState(null, '', Routes.NOT_FOUND);
    this.navigate(Routes.NOT_FOUND);
  }
}
