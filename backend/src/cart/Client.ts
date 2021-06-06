import { ICartSku } from '../cart_sku/Types';
import { axiosClient } from '../middlewares/Handler';
import { Options, ResponseAPI } from '../middlewares/Types';
import { handleAxiosResponse } from '../middlewares/Utils';
import { ICart } from './Types';

export const CartClient = (baseURL: string, options?: Options) => {
  const client = axiosClient(baseURL, options);

  return {
    async findByKey(key?: string): Promise<ResponseAPI<ICart>> {
      return handleAxiosResponse(async () => {
        return (
          await client({
            method: 'get',
            url: `/cart/${key}`,
          })
        ).data;
      });
    },

    async removeProduct(
      cart_key: string,
      cart_sku_key: string
    ): Promise<ResponseAPI<ICartSku>> {
      return handleAxiosResponse(async () => {
        const { data } = await client({
          method: 'delete',
          url: `/cart/${cart_key}/product/${cart_sku_key}`,
        });

        return data;
      });
    },

    async updateProduct(
      cart_key: string,
      cart_sku_key: string,
      data: Partial<ICartSku>
    ): Promise<ResponseAPI<ICartSku>> {
      const _data = {
        ...data,
      };

      return handleAxiosResponse(async () => {
        const { data } = await client({
          method: 'put',
          url: `/cart/${cart_key}/product/${cart_sku_key}`,
          data: _data,
        });

        return data;
      });
    },

    async addProduct(
      cart_key: string,
      cartSku: Partial<ICartSku>
    ): Promise<ResponseAPI<ICartSku>> {
      return handleAxiosResponse(async () => {
        const { data } = await client({
          method: 'post',
          url: `/cart/${cart_key}/product`,
          data: cartSku,
        });

        return data;
      });
    },
  };
};

export type ICartClient = ReturnType<typeof CartClient>;
