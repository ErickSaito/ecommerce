import { Command } from 'commander';
import debug from 'debug';
import dotenv from 'dotenv';
import * as path from 'path';

(async function main() {
  const ecommerce = new Command();
  dotenv.config({
    path: path.resolve(__dirname, '..', process.env.ENV_FILE_PATH || '.env'),
  });
  debug.enable(process.env.DEBUG);

  {
    ecommerce.version('v0.1.0');

    ecommerce.command('dev').action(async () => {
      (await import('./app')).default();
    });
  }

  ecommerce.parseAsync(process.argv);
})();
