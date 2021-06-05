import { INVALID_RESOURCE, RESOURCE_NOT_FOUND } from '../error/Types';
import { ApplicationError } from '../middlewares/Types';
import { BaseOptions } from '../middlewares/Utils';
import db from '../sequelize/Sequelize';
import { ProductModel } from './Model';
import { IProduct, IProductFilter } from './Types';
import { validateProduct } from './Validator';

export interface ProductOptions extends BaseOptions {
  filter?: IProductFilter;
}

export type IProductService = Readonly<ReturnType<typeof ProductService>>;

export const ProductService = ({
  productModel = ProductModel,
  database = db,
} = {}) => {
  const service = {
    create,
    update,
    findAll,
    findByKey,
    destroy,
  };

  async function create(
    data: Partial<IProduct>,
    options?: BaseOptions
  ): Promise<[IProduct, ApplicationError]> {
    const [validatedData, err] = validateProduct(data);

    if (err) {
      return [undefined, INVALID_RESOURCE(err.fields)];
    }

    const created = await productModel.create(
      {
        ...validatedData,
      },
      {
        logging: (sql) => options?.ctx?.log?.(sql),
        transaction: options?.transaction,
      }
    );

    return [created, undefined];
  }

  async function update(
    data: Partial<IProduct>,
    options?: BaseOptions
  ): Promise<[IProduct, ApplicationError]> {
    const { key, ...values } = data;

    const prev = await productModel.findByPk(key);

    if (!prev) {
      return [undefined, RESOURCE_NOT_FOUND(key)];
    }

    const [, [updated]] = await productModel.update(values, {
      where: {
        key,
      },
      logging: (sql) => options?.ctx?.log?.(sql),
      returning: true,
      transaction: options?.transaction,
    });

    return [updated, undefined];
  }

  async function findAll(options?: ProductOptions): Promise<IProduct[]> {
    const filter = options?.filter;
    const [x, y] = await database.query('SELECT * FROM product');

    console.log(x, y);
    const results = await productModel.findAll({
      ...(filter && {
        where: {
          ...filter,
        },
      }),
      logging: (sql) => options?.ctx?.log?.(sql),
    });

    return results;
  }

  async function findByKey(
    key: string,
    options?: BaseOptions
  ): Promise<[IProduct, ApplicationError]> {
    const result = await productModel.findByPk(key, {
      logging: (sql) => options?.ctx?.log?.(sql),
    });

    if (!result) {
      return [undefined, RESOURCE_NOT_FOUND(key)];
    }

    return [result, undefined];
  }

  async function destroy(
    key: string,
    options?: BaseOptions
  ): Promise<[number, ApplicationError]> {
    const deleted = await productModel.destroy({
      where: {
        key,
      },
      limit: 1,
      logging: (sql) => options?.ctx?.log?.(sql),
      transaction: options?.transaction,
    });

    if (!deleted) {
      return [undefined, RESOURCE_NOT_FOUND(key)];
    }

    return [deleted, undefined];
  }

  return service;
};
