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
import { SkuModel } from '../sku/Model';
import { ISku } from '../sku/Types';
import { IProduct } from './Types';

@Table({ modelName: 'product', freezeTableName: true })
export class ProductModel extends Model implements IProduct {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.BIGINT)
  key: string;

  @Column(DataType.STRING)
  name: string;

  @Column(DataType.STRING)
  image: string;

  @HasMany(() => SkuModel, 'product_key')
  skus: ISku[];

  @CreatedAt
  @Column(DataType.TIME)
  created_at: string;

  @UpdatedAt
  @Column(DataType.TIME)
  updated_at: string;
}
