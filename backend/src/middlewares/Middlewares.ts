import cookieParser from 'cookie-parser';
import { createHash } from 'crypto';
import express from 'express';
import {
  NextFunction,
  Request,
  RequestHandler,
  Response,
} from 'express-serve-static-core';
import morgan from 'morgan';
import * as os from 'os';
import { v1 } from 'uuid';
import { ResponseAPI } from './Types';

const errorResponse: ResponseAPI = Object.freeze({
  status: 500,
  success: false,
  message: 'Internal Server Error',
});

const hostId = getHostId();

export const defaultMiddlewares = [
  express.urlencoded({ extended: true }),
  express.json({ limit: '100mb' }),
  cookieParser(),
  express.json({ type: 'application/vnd.api+json' }),
  express.raw({
    limit: '10mb',
    type: ['application/pdf', 'image/*'],
  }),
] as RequestHandler[];

export const optionsMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const origin = req.headers.origin ? String(req.headers.origin) : '*';
  res.header('Access-Control-Allow-Origin', origin);
  res.header(
    'Access-Control-Allow-Methods',
    'POST, GET, OPTIONS, DELETE, PUT, PATCH'
  );
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, Authorization, X-Requested-With, Content-Type, Accept, Charset, X-Auth-Token'
  );
  res.header('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
  } else {
    next();
  }
};

export const cacheMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');
  next();
};

export const tidMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const tid = v1();
  res.locals.tid = tid;
  res.header('X-Tid', tid);
  if (hostId && typeof hostId === 'string') {
    res.header('X-Sid', hostId);
  }
  next();
};

export const logMiddleware: any = morgan(
  (tokens, req, res) =>
    /* tslint:disable */
    `${res.locals.tid} ${tokens['remote-addr'](req, res)} - ` +
    `${tokens['status'](req, res)} ${req.method} ${req.url} "HTTP/${tokens[
      'http-version'
    ](req, res)}" ` +
    `${tokens['referrer'](req, res)}" "${tokens['user-agent'](
      req,
      res
    )}" - ${tokens['response-time'](req, res)} ms`
  /* tslint:enable */
);

export const errorHandler = async (
  err,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(500).json({
    ...errorResponse,
    ...(String(req.path).includes('/restrict') && {
      error: err,
    }),
  });
};

function getHostId() {
  try {
    return createHash('md5').update(os.hostname()).digest('hex').toString();
  } catch (err) {
    return undefined;
  }
}
