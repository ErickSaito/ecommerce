import { IProduct } from '../product/Types';

export interface ISku {
  key: string;
  inventory: number;
  price: number;
  created_at: string;
  updated_at: string;
  product_key: string;
  product: IProduct;
}
