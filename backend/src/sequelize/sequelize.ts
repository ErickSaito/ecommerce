import { Sequelize } from 'sequelize-typescript';
import { CartModel } from '../cart/Model';
import Config from '../config';
import { ProductModel } from '../product/Model';
import { SkuModel } from '../sku/Model';

const db = new Sequelize({
  host: Config.SQL_HOST,
  database: Config.SQL_DATABASE,
  username: Config.SQL_USER,
  password: Config.SQL_PASSWORD,
  port: Config.SQL_PORT,
  dialect: 'postgres',
  dialectOptions: {
    application_name: 'ecommerce',
    keepAlive: true,
    statement_timeout: Config.SQL_STATEMENT_TIMEOUT,
    idle_in_transaction_session_timeout:
      Config.SQL_IDLE_IN_TRANSACTION_SESSION_TIMEOUT,
  },
  pool: {
    max: Config.SQL_POOL_MAX,
    min: Config.SQL_POOL_MIN,
    idle: Config.SQL_POOL_IDLE,
    acquire: Config.SQL_POOL_ACQUIRE,
    evict: Config.SQL_POOL_EVICT,
    handleDisconnects: true,
  },
  quoteIdentifiers: false,
  benchmark: true,
  logging: false,
} as any);

db.addModels([ProductModel, SkuModel, CartModel]);

export default db;
