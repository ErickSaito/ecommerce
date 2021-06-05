import { IProduct } from '../product/Types';

export interface ISku {
  key: string;
  inventory: string;
  price: string;
  created_at: string;
  updated_at: string;
  product_key: string;
  product: IProduct;
}
