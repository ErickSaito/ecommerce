import { ICart } from '../cart/Types';
import { ISku } from '../sku/Types';

export interface ICartSku {
  key: string;
  qty: number;
  cart_key: string;
  cart: ICart;
  sku_key: string;
  sku: ISku;
  created_at: string;
  updated_at: string;
}
