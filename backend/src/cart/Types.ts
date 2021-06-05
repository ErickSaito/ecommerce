import { ISku } from '../sku/Types';

export interface ICart {
  key: string;
  qty: number;
  sku_key: string;
  sku: ISku;
  created_at: string;
  updated_at: string;
}
