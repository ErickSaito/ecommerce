import { CartModel } from '../cart/Model';
import { CONFLICT, INVALID_RESOURCE, RESOURCE_NOT_FOUND } from '../error/Types';
import { ApplicationError } from '../middlewares/Types';
import { BaseOptions } from '../middlewares/Utils';
import { ProductModel } from '../product/Model';
import { SkuModel } from '../sku/Model';
import { CartSkuModel } from './Model';
import { ICartSku } from './Types';
import { validateCartSku } from './Validator';

export type ICartSkuService = Readonly<ReturnType<typeof CartSkuService>>;

export const CartSkuService = ({
  cartSkuModel = CartSkuModel,
  skuModel = SkuModel,
  cartModel = CartModel,
} = {}) => {
  const service = {
    create,
    findAll,
    update,
    destroy,
  };

  async function create(
    data: Partial<ICartSku>,
    options?: BaseOptions
  ): Promise<[ICartSku, ApplicationError]> {
    const [validatedData, err] = validateCartSku(data);

    if (err) {
      return [undefined, INVALID_RESOURCE(err.fields)];
    }

    const cart = await cartModel.findByPk(data.cart_key);

    if (!cart) {
      return [undefined, RESOURCE_NOT_FOUND(data.cart_key)];
    }

    const sku = await skuModel.findByPk(data.sku_key);
    if (!sku) {
      return [undefined, RESOURCE_NOT_FOUND(data.sku_key)];
    }

    const prev = await cartSkuModel.findOne({
      where: {
        cart_key: data.cart_key,
        sku_key: data.sku_key,
      },
    });

    if (prev) {
      return await service.update({ ...prev.toJSON(), qty: prev.qty + 1 });
    }

    const created = await cartSkuModel.create(
      {
        ...validatedData,
        qty: 1,
      },
      {
        logging: (sql) => options?.ctx?.log?.(sql),
        transaction: options?.transaction,
      }
    );
    return [created, undefined];
  }

  async function update(
    data: Partial<ICartSku>,
    options?: BaseOptions
  ): Promise<[ICartSku, ApplicationError]> {
    const { key, ...values } = data;

    const prev = await cartSkuModel.findByPk(key, {
      include: [SkuModel],
    });

    if (!prev) {
      return [undefined, RESOURCE_NOT_FOUND(key)];
    }

    if (prev.sku.inventory < data.qty) {
      return [undefined, CONFLICT('Não temos mais estoque deste produto')];
    }

    const [, [updated]] = await cartSkuModel.update(values, {
      where: {
        key,
      },
      logging: (sql) => options?.ctx?.log?.(sql),
      returning: true,
      transaction: options?.transaction,
    });

    return [updated, undefined];
  }

  async function findAll(options?: BaseOptions): Promise<ICartSku[]> {
    const results = await cartSkuModel.findAll({
      logging: (sql) => options?.ctx?.log?.(sql),
      include: [
        {
          model: SkuModel,
          include: [ProductModel],
        },
      ],
    });

    return results;
  }

  async function destroy(
    key: string,
    options?: BaseOptions
  ): Promise<[number, ApplicationError]> {
    const deleted = await cartSkuModel.destroy({
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
