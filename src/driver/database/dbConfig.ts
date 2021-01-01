import { defaultTo } from 'ramda';
import { log } from '../../helper/logger';

export interface DbConfigItemType {
    db: string;
    dialect: 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql';
    host: string;
    logging: Function;
    ns: string;
    password: string;
    port: number;
    timezone: string;
    username: string;
}

const db: DbConfigItemType = {
  db: defaultTo('kasmaji', process.env.DB_MAIN_DATABASE),
  dialect: 'mysql',
  host: defaultTo('127.0.0.1', process.env.DB_MAIN_HOST),
  logging: (msg) => log('info', msg),
  ns: 'models',
  password: defaultTo('admin123', process.env.DB_MAIN_PASSWORD),
  port: process.env.DB_MAIN_PORT ? parseInt(process.env.DB_MAIN_PORT, 10) : 0,
  timezone: defaultTo('+07:00', process.env.DB_MAIN_TIMEZONE),
  username: defaultTo('root', process.env.DB_MAIN_USERNAME),
};

export default db;
