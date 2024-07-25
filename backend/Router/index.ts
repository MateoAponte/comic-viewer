import { Routes } from './Routes';

export class MiddlewareRouter {
  private routes: Routes = {};

  constructor(Routes: Routes) {
    this.routes = Routes;
  }

  private getRoute(path: string) {
    const getCurrentRoute = Object.keys(this.routes).findIndex(
      (route) => route.indexOf(path) !== -1
    );
    return getCurrentRoute;
  }

  async exec(event) {
    const getCurrentRoute = this.getRoute(event.path);
    return this.routes[getCurrentRoute].action.init(event);
  }
}
