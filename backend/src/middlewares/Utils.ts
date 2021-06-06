import { Response } from 'express-serve-static-core';
import { ApplicationError, ResponseAPI, ResponseMetadata } from './Types';

export const PAGE_SIZE = 25;

export interface IBuildResponseDataInput<T, E extends ApplicationError> {
  status: number;
  data?: T;
  err?: E;
}

export interface IBuildResponseResultsInput<T, E extends ApplicationError> {
  status: number;
  results: T[];
  metadata: ResponseMetadata;
  err?: E;
}

export function buildResponseData<T, E extends ApplicationError>(
  responseData: IBuildResponseDataInput<T, E>
): ResponseAPI<T, E> {
  const { status = 500, data, err } = responseData;
  return err
    ? {
        status: err.status || 500,
        success: false,
        message: err.message,
        error: err,
      }
    : {
        status,
        success: true,
        ...{ data },
      };
}

export function buildResponseResults<T, E extends ApplicationError>(
  responseData: IBuildResponseResultsInput<T, E>
): ResponseAPI<T, E> {
  const { status = 500, results, metadata, err } = responseData;

  return err
    ? {
        status: err.status || 500,
        success: false,
        error: err,
      }
    : {
        status,
        success: true,
        results,
        metadata,
      };
}

export function sendResponseResults<T, E extends ApplicationError>(
  response: Response,
  body: ResponseAPI<T, E>
): Response {
  if (body.status >= 400) {
    return response.status(body.status).json(body);
  }

  return response.status(body.status).json(body);
}

export async function handleAxiosResponse(
  fn: () => Promise<any>
): Promise<ResponseAPI<any, any>> {
  try {
    return await fn();
  } catch (err) {
    if (err?.response?.data?.status) {
      return err.response.data;
    }

    return {
      status: err.response.status,
      success: false,
      data: err.response.data,
      message: err.message,
      error: err,
    };
  }
}

export type Limit = number;
export type Offset = number;
export type Count = number;

export interface Context {
  log: (...args: any[]) => void;
  error?: (...args: any[]) => void;
}

export interface BaseOptions {
  ctx: Context;
  transaction?: any;
  offset?: Offset;
  limit?: Limit;
}
