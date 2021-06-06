import express, { Router } from 'express';
import { NextFunction, Request, Response } from 'express-serve-static-core';
import { CartSkuService } from '../cart_sku/Service';
import { ContextLoggerBuild } from '../log/Logger';
import {
  defaultMiddlewares,
  optionsMiddleware,
} from '../middlewares/Middlewares';
import { buildResponseData, Context } from '../middlewares/Utils';
import { CartService } from './Service';

export function handler(): Router {
  const cartService = CartService();
  const cartSkuService = CartSkuService();
  const router = express.Router({ mergeParams: true });
  const middlewares = [...defaultMiddlewares, optionsMiddleware];
  const Logger = ContextLoggerBuild('CartSkuHandler');

  router.post(
    '/',
    ...middlewares,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const ctx: Context = { log: Logger('POST /', res.locals.tid) };

        const data = req.body;

        const [result, err] = await cartService.create({ ctx });

        const response = buildResponseData({
          status: 201,
          data: result,
          err,
        });

        res.status(response.status).json(response);
      } catch (err) {
        next(err);
      }
    }
  );

  router.get(
    '/:key',
    ...middlewares,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const ctx: Context = { log: Logger('GET /:key', res.locals.tid) };
        const { key } = req.params;

        const [data, err] = await cartService.findByKey(key, {
          ctx,
        });

        const responseData = buildResponseData({
          status: 200,
          data,
          err,
        });

        res.status(responseData.status).json(responseData);
      } catch (err) {
        next(err);
      }
    }
  );

  router.delete(
    '/:key/product/:cart_sku_key',
    ...middlewares,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const ctx: Context = {
          log: Logger('DELETE /:key/sku/:sku', res.locals.tid),
        };

        const { cart_sku_key } = req.params;

        const [count, err] = await cartSkuService.destroy(cart_sku_key, {
          ctx,
        });

        const response = buildResponseData({
          status: 200,
          data: count,
          err,
        });

        res.status(response.status).json(response);
      } catch (err) {
        next(err);
      }
    }
  );

  router.put(
    '/:key/product/:cart_sku_key',
    ...middlewares,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const ctx: Context = { log: Logger('PUT /:key', res.locals.tid) };

        const data = req.body;
        const { key, cart_sku_key } = req.params;

        const [result, err] = await cartSkuService.update(
          { ...data, key: cart_sku_key, cart_key: key },
          { ctx }
        );

        const response = buildResponseData({
          status: 200,
          data: result,
          err,
        });

        res.status(response.status).json(response);
      } catch (err) {
        next(err);
      }
    }
  );

  router.post(
    '/:key/product',
    ...middlewares,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const ctx: Context = { log: Logger('POST /', res.locals.tid) };

        const data = req.body;
        const { key } = req.params;

        const [result, err] = await cartSkuService.create(
          { ...data, cart_key: key },
          { ctx }
        );

        const response = buildResponseData({
          status: 201,
          data: result,
          err,
        });

        res.status(response.status).json(response);
      } catch (err) {
        next(err);
      }
    }
  );

  return router;
}
