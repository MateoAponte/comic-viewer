import { RatingService } from './Services/RatingService';
import { MiddlewareRouter } from './Router';
import { HttpRoutes } from './types/Http/HttpRoutes';
import { HttpCode } from './types/Http/HttpCode';

exports.handler = async (event) => {
  const router = new MiddlewareRouter({
    rating: {
      path: HttpRoutes.Rating,
      action: new RatingService(),
    },
  });

  try {
    return await router.exec(event);
  } catch (err) {
    console.error('Handler error:', err);
    return {
      statusCode: HttpCode.BAD,
      message: '',
    };
  }
};
