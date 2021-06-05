import { ISku } from '../sku/Types';

export interface IProduct {
  key: string;
  name: string;
  image: string;
  skus: ISku[];
  created_at: string;
  updated_at: string;
}
