import { ICartSku } from '../cart_sku/Types';

export interface ICart {
  key: string;
  cartSkus: ICartSku[];
  created_at: string;
  updated_at: string;
}
