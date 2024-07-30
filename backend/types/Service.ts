import { Response } from './Response';

export interface Service {
  init(event): Promise<Response> | Response;
}
