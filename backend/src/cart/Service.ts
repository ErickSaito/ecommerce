import { CartSkuModel } from '../cart_sku/Model';
import { ApplicationError } from '../middlewares/Types';
import { BaseOptions } from '../middlewares/Utils';
import { ProductModel } from '../product/Model';
import { SkuModel } from '../sku/Model';
import { CartModel } from './Model';
import { ICart } from './Types';

export type ICartService = Readonly<ReturnType<typeof CartService>>;

export const CartService = ({ cartModel = CartModel } = {}) => {
  const service = {
    create,
    findByKey,
  };

  async function create(
    options?: BaseOptions
  ): Promise<[ICart, ApplicationError]> {
    const created = await cartModel.create({
      logging: (sql) => options?.ctx?.log?.(sql),
      transaction: options?.transaction,
    });

    return [created, undefined];
  }

  async function findByKey(
    key: string,
    options?: BaseOptions
  ): Promise<[ICart, ApplicationError]> {
    const result = await cartModel.findByPk(key, {
      include: [
        {
          model: CartSkuModel,
          include: [
            {
              model: SkuModel,
              include: [ProductModel],
            },
          ],
        },
      ],
      logging: (sql) => options?.ctx?.log?.(sql),
    });

    if (!result) {
      return await service.create(options);
    }

    return [result, undefined];
  }
  return service;
};
