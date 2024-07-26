import { HttpCode } from '../types/Http/HttpCode';
import { Routes } from './Routes';

export class MiddlewareRouter {
  private routes: Routes = {};

  constructor(Routes: Routes) {
    this.routes = Routes;
  }

  private getRoute(path: string) {
    const getCurrentRoute = Object.keys(this.routes).find((route) => {
      return this.routes[route].path.indexOf(path) !== -1;
    });
    return getCurrentRoute;
  }

  async exec(event) {
    const getCurrentRoute = this.getRoute(event.path);
    if (getCurrentRoute !== undefined) {
      try {
        return await this.routes[getCurrentRoute].action.init(event);
      } catch (err) {
        console.error('Error executing route:', err);
        return {
          statusCode: HttpCode.BAD,
          message: 'Internal Server Error',
          error: err.message || 'Unknown error',
        };
      }
    } else {
      return {
        statusCode: HttpCode.BAD,
        message: "The route doesn't exist",
      };
    }
  }
}
