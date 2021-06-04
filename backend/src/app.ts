import express from 'express';
import helmet from 'helmet';
import config from './config';
import {
  cacheMiddleware,
  errorHandler,
  logMiddleware,
  optionsMiddleware,
  tidMiddleware,
} from './middlewares/Middlewares';

export default () => initApp();

export function initApp({ port = config.PORT } = {}) {
  return new Promise((resolve) => {
    const app = buildApp();
    app.listen(port, '0.0.0.0', () => {
      console.log(`App listening on port %s`, port);
      resolve(app);
    });
  });
}

export function buildApp(): any {
  const app = express();

  app.disable('etag');
  app.use(helmet());
  app.use(tidMiddleware);

  // prettier-ignore
  {
    app.get('/', (req, res) => res.status(200).send('ok'));
    app.get('/ping', (req, res) => res.status(200).send('pong'));
    app.get('/readiness_check', (req, res) => res.status(200).send('ok'));
    app.use(optionsMiddleware);
    app.use(cacheMiddleware);
    app.use(logMiddleware);

    // app.use(errorHandler);
  }

  return app;
}
