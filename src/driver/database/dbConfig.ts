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
  db: defaultTo(process.env.DB_MAIN_DATABASE, 'kasmaji'),
  dialect: 'mysql',
  host: defaultTo(process.env.DB_MAIN_HOST, '127.0.0.1'),
  logging: true,
  ns: 'models',
  password: defaultTo(process.env.DB_MAIN_PASSWORD, 'admin123'),
  port: process.env.DB_MAIN_PORT ? parseInt(process.env.DB_MAIN_PORT, 10) : 0,
  timezone: defaultTo(process.env.DB_MAIN_TIMEZONE, '+07:00'),
  username: defaultTo(process.env.DB_MAIN_USERNAME, 'root'),
};

export default db;
