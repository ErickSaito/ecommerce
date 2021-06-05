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
import { SkuModel } from '../sku/Model';
import { ISku } from '../sku/Types';
import { ICart } from './Types';

@Table({ modelName: 'cart', freezeTableName: true })
export class CartModel extends Model implements ICart {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.STRING)
  key: string;

  @Column(DataType.INTEGER)
  qty: number;

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
