import { HttpCode } from 'aws-sdk/clients/elbv2';

export interface Response {
  statusCode: HttpCode;
  message?: string;
}
