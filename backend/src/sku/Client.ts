import { axiosClient } from '../middlewares/Handler';
import { Options, ResponseAPI } from '../middlewares/Types';
import { handleAxiosResponse } from '../middlewares/Utils';
import { ISku } from './Types';

export const SkuClient = (baseURL: string, options?: Options) => {
  const client = axiosClient(baseURL, options);

  return {
    async findAll(): Promise<ResponseAPI<ISku>> {
      return handleAxiosResponse(async () => {
        return (
          await client({
            method: 'get',
            url: '/product',
          })
        ).data;
      });
    },
  };
};

export type ISkuClient = ReturnType<typeof SkuClient>;
