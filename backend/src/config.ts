import { IsNotEmpty, IsNumber, IsString, validateSync } from 'class-validator';
import dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(__dirname, '..', '..', '.env') });

export type NodeEnv = 'production' | 'homologation' | 'development' | 'test';

export interface IConfig {
  NODE_ENV: NodeEnv;
  DEBUG: string;
  PORT: number;

  SQL_USER: string;
  SQL_PASSWORD: string;
  SQL_DATABASE: string;
  SQL_HOST: string;
  SQL_PORT: string;
  SQL_CONN_STRING: string;
  SQL_POOL_MAX: number;
  SQL_POOL_MIN: number;
  SQL_POOL_IDLE: number;
  SQL_POOL_ACQUIRE: number;
  SQL_POOL_EVICT: number;
  SQL_STATEMENT_TIMEOUT: number;
  SQL_IDLE_IN_TRANSACTION_SESSION_TIMEOUT: number;
}

class ConfigValidator implements IConfig {
  @IsNotEmpty()
  @IsString()
  NODE_ENV: NodeEnv;

  @IsString()
  DEBUG: string;

  @IsNumber()
  PORT: number;

  @IsNotEmpty()
  @IsString()
  SQL_USER: string;

  @IsNotEmpty()
  @IsString()
  SQL_PASSWORD: string;

  @IsNotEmpty()
  @IsString()
  SQL_DATABASE: string;

  @IsNotEmpty()
  @IsString()
  SQL_HOST: string;

  @IsNotEmpty()
  @IsString()
  SQL_PORT: string;

  @IsNumber()
  SQL_POOL_MAX: number;

  @IsNumber()
  SQL_POOL_MIN: number;

  @IsNumber()
  SQL_POOL_IDLE: number;

  @IsNumber()
  SQL_POOL_ACQUIRE: number;

  @IsNumber()
  SQL_POOL_EVICT: number;

  @IsNumber()
  SQL_STATEMENT_TIMEOUT: number;

  @IsNumber()
  SQL_IDLE_IN_TRANSACTION_SESSION_TIMEOUT: number;

  @IsString()
  SQL_CONN_STRING: string;
}

const config = buildConfig();
export default config;

export function buildConfig({ optionalConf = null, throwErr = false } = {}) {
  const baseConf = {
    ...optionalConf,
    ...process.env,
  };
  const conf: Readonly<IConfig> = {
    ...baseConf,
    NODE_ENV: String(baseConf.NODE_ENV).toLowerCase(),
    PORT: Number(baseConf.PORT),
    SQL_USER: baseConf.SQL_USER,
    SQL_POOL_MAX: Number(baseConf.SQL_POOL_MAX ?? 5),
    SQL_POOL_MIN: Number(baseConf.SQL_POOL_MIN ?? 2),
    SQL_POOL_IDLE: Number(baseConf.SQL_POOL_IDLE ?? 30000),
    SQL_POOL_ACQUIRE: Number(baseConf.SQL_POOL_ACQUIRE ?? 30000),
    SQL_POOL_EVICT: Number(baseConf.SQL_POOL_EVICT ?? 30000),
    SQL_CONN_STRING: `postgres://${baseConf.SQL_USER}:${baseConf.SQL_PASSWORD}@${baseConf.SQL_HOST}:${baseConf.SQL_PORT}/${baseConf.SQL_DATABASE}`,
  };

  const validator = new ConfigValidator();
  Object.assign(validator, conf);

  const errors = validateSync(validator, {
    whitelist: false,
    forbidNonWhitelisted: false,
  });

  if (errors.length) {
    const errorList = errors.map(({ property, constraints }) => ({
      property,
      constraints,
    }));
    const err = new Error(JSON.stringify(errorList));
    if (throwErr) {
      throw err;
    } else {
      console.error('buildGlobalConfigErr=%o', err);
    }
  }
  return Object.freeze(conf);
}
