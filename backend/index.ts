import { RatingService } from './Services/RatingService';
import { MiddlewareRouter } from './Router';
import { HttpRoutes } from './types/Http/HttpRoutes';

exports.handler = async (event) => {
  const router = new MiddlewareRouter({
    rating: {
      path: HttpRoutes.Rating,
      action: new RatingService(),
    },
  });

  return await router.exec(event);
};
