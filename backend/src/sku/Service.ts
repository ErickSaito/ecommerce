import { BaseOptions } from '../middlewares/Utils';
import { ProductModel } from '../product/Model';
import { SkuModel } from './Model';
import { ISku } from './Types';

export type ISkuService = Readonly<ReturnType<typeof SkuService>>;

export const SkuService = ({ skuModel = SkuModel } = {}) => {
  const service = {
    findAll,
  };

  async function findAll(options?: BaseOptions): Promise<ISku[]> {
    const results = await skuModel.findAll({
      logging: (sql) => options?.ctx?.log?.(sql),
      include: [ProductModel],
    });

    return results;
  }

  return service;
};
