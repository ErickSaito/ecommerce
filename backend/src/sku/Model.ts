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
import { ProductModel } from '../product/Model';
import { IProduct } from '../product/Types';
import { ISku } from './Types';

@Table({ modelName: 'sku' })
export class SkuModel extends Model implements ISku {
  @PrimaryKey
  @Column(DataType.STRING)
  key: string;

  @Column(DataType.BIGINT)
  product_key: string;

  @Column(DataType.INTEGER)
  inventory: number;

  @Column(DataType.BIGINT)
  price: string;

  @BelongsTo(() => ProductModel, 'product_key')
  product: IProduct;

  @CreatedAt
  @Column(DataType.TIME)
  created_at: string;

  @UpdatedAt
  @Column(DataType.TIME)
  updated_at: string;
}
