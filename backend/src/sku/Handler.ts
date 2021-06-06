import express, { Router } from 'express';
import { NextFunction, Request, Response } from 'express-serve-static-core';
import { ContextLoggerBuild } from '../log/Logger';
import {
  defaultMiddlewares,
  optionsMiddleware,
} from '../middlewares/Middlewares';
import {
  buildResponseData,
  buildResponseResults,
  Context,
} from '../middlewares/Utils';
import { SkuService } from './Service';

export function handler(): Router {
  const service = SkuService();
  const router = express.Router({ mergeParams: true });
  const middlewares = [...defaultMiddlewares, optionsMiddleware];
  const Logger = ContextLoggerBuild('SkuHandler');

  router.put(
    '/:key',
    ...middlewares,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const ctx: Context = { log: Logger('PUT /:key', res.locals.tid) };

        const data = req.body;
        const { key } = req.params;

        const [result, err] = await service.update({ ...data, key }, { ctx });

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

  router.get(
    '/',
    ...middlewares,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const ctx: Context = { log: Logger('GET /', res.locals.tid) };

        const results = await service.findAll({
          ctx,
        });

        const metadata = {
          count: results.length,
          offset: 0,
          limit: results.length,
        };

        const response = buildResponseResults({
          status: 200,
          results,
          metadata,
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

        const [data, err] = await service.findByKey(key, {
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

  return router;
}
