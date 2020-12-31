import { defaultTo } from 'ramda';

export interface DbConfigItemType {
    db: string;
    dialect: 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql';
    host: string;
    logging: boolean;
    ns: string;
    password: string;
    port: number;
    timezone: string;
    username: string;
}

const db: DbConfigItemType = {
  db: defaultTo('', process.env.DB_MAIN_DATABASE),
  dialect: 'mysql',
  host: defaultTo('', process.env.DB_MAIN_HOST),
  logging: process.env.DB_MAIN_LOGGING === 'true',
  ns: 'main',
  password: defaultTo('', process.env.DB_MAIN_PASSWORD),
  port: process.env.DB_MAIN_PORT ? parseInt(process.env.DB_MAIN_PORT, 10) : 0,
  timezone: defaultTo('', process.env.DB_MAIN_TIMEZONE),
  username: defaultTo('', process.env.DB_MAIN_USERNAME),
};

export default db;
