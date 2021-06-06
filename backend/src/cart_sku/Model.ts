import {
  AutoIncrement,
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { CartModel } from '../cart/Model';
import { ICart } from '../cart/Types';
import { SkuModel } from '../sku/Model';
import { ISku } from '../sku/Types';
import { ICartSku } from './Types';

@Table({ modelName: 'cart_sku', freezeTableName: true })
export class CartSkuModel extends Model implements ICartSku {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.STRING)
  key: string;

  @Column(DataType.INTEGER)
  qty: number;

  @Column(DataType.STRING)
  cart_key: string;

  @BelongsTo(() => CartModel, 'cart_key')
  cart: ICart;

  @Column(DataType.STRING)
  sku_key: string;

  @BelongsTo(() => SkuModel, 'sku_key')
  sku: ISku;

  @CreatedAt
  @Column(DataType.TIME)
  created_at: string;

  @UpdatedAt
  @Column(DataType.TIME)
  updated_at: string;
}
