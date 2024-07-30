import { Service } from '../types/Service';

export type Routes = {
  [key: string]: {
    path: string;
    action: Service;
  };
};
