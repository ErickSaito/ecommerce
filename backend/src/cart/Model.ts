import {
  AutoIncrement,
  Column,
  CreatedAt,
  DataType,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { CartSkuModel } from '../cart_sku/Model';
import { ICartSku } from '../cart_sku/Types';
import { ICart } from './Types';

@Table({ modelName: 'cart', freezeTableName: true })
export class CartModel extends Model implements ICart {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.STRING)
  key: string;

  @HasMany(() => CartSkuModel, 'cart_key')
  cartSkus: ICartSku[];

  @CreatedAt
  @Column(DataType.TIME)
  created_at: string;

  @UpdatedAt
  @Column(DataType.TIME)
  updated_at: string;
}
