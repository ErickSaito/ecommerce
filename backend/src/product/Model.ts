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
import { IProduct } from './Types';

@Table({ modelName: 'product' })
export class ProductModel
  extends Model<ProductModel>
  implements IProduct {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.BIGINT)
  key: string;

  @Column(DataType.STRING)
  name: string;

  @Column(DataType.STRING)
  image: string;

  @CreatedAt
  @Column(DataType.TIME)
  created_at: string;

  @UpdatedAt
  @Column(DataType.TIME)
  updated_at: string;
}
