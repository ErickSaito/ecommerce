import { RESOURCE_NOT_FOUND } from '../error/Types';
import { ApplicationError } from '../middlewares/Types';
import { BaseOptions } from '../middlewares/Utils';
import { ProductModel } from '../product/Model';
import { SkuModel } from './Model';
import { ISku } from './Types';

export type ISkuService = Readonly<ReturnType<typeof SkuService>>;

export const SkuService = ({ skuModel = SkuModel } = {}) => {
  const service = {
    update,
    findAll,
    findByKey,
  };

  async function update(
    data: Partial<ISku>,
    options?: BaseOptions
  ): Promise<[ISku, ApplicationError]> {
    const { key, ...values } = data;

    const prev = await skuModel.findByPk(key);

    if (!prev) {
      return [undefined, RESOURCE_NOT_FOUND(key)];
    }

    const [, [updated]] = await skuModel.update(values, {
      where: {
        key,
      },
      logging: (sql) => options?.ctx?.log?.(sql),
      returning: true,
      transaction: options?.transaction,
    });

    return [updated, undefined];
  }

  async function findAll(options?: BaseOptions): Promise<ISku[]> {
    const results = await skuModel.findAll({
      logging: (sql) => options?.ctx?.log?.(sql),
      include: [ProductModel],
    });

    return results;
  }

  async function findByKey(
    key: string,
    options?: BaseOptions
  ): Promise<[ISku, ApplicationError]> {
    const result = await skuModel.findByPk(key, {
      logging: (sql) => options?.ctx?.log?.(sql),
    });

    if (!result) {
      return [undefined, RESOURCE_NOT_FOUND(key)];
    }

    return [result, undefined];
  }

  return service;
};
