import axios from 'axios';
import { Options } from './Types';

export const CLIENT_TIMEOUT = 5 * 60 * 1000;

export const axiosClient = (baseURL?: string, options?: Options) => {
  if (!options?.axiosInstance) {
    return axios.create({
      baseURL,
      timeout: CLIENT_TIMEOUT,
      withCredentials: true,
      ...parseOptions(options),
    });
  } else {
    return options.axiosInstance;
  }
};

export function parseOptions(options: Options) {
  if (options) {
    const { cacheControl } = options;
    return {
      ...options,
      ...(!!cacheControl && {
        params: {
          'cache-control': cacheControl,
        },
      }),
    };
  }
}
