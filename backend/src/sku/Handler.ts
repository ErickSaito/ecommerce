import express, { Router } from 'express';
import { NextFunction, Request, Response } from 'express-serve-static-core';
import { ContextLoggerBuild } from '../log/Logger';
import {
  defaultMiddlewares,
  optionsMiddleware,
} from '../middlewares/Middlewares';
import { buildResponseResults, Context } from '../middlewares/Utils';
import { SkuService } from './Service';

export function handler(): Router {
  const service = SkuService();
  const router = express.Router({ mergeParams: true });
  const middlewares = [...defaultMiddlewares, optionsMiddleware];
  const Logger = ContextLoggerBuild('SkuHandler');

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

  return router;
}
