import { HttpCode } from 'aws-sdk/clients/elbv2';

export interface Response {
  code: HttpCode;
  message?: string;
}
