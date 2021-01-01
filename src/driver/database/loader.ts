/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
import * as path from 'path';
import { isNil } from 'ramda';
import { Sequelize, DataTypes } from 'sequelize';
import { DbConfigItemType } from './config';
import { log } from '../../helper/logger';

export default (db: DbConfigItemType, files: string[]): any => {
  const sequelize = new Sequelize(db.db, db.username, db.password, {
    host: db.host,
    dialect: db.dialect,
    port: db.port,
    dialectOptions: { decimalNumbers: true },
    define: {
      timestamps: false, // true by default
    },
    timezone: db.timezone,
    logging: db.logging,
  });

  sequelize.authenticate()
    .then(() => {
      log('info', 'Connected to DB');
    })
    .catch((e) => {
      log('error', 'error db connection', e);

      process.exit(0);
    });

  sequelize.sync();

  const dir: string = `${__dirname}/${db.ns}`;

  const models = files
    .map((file) => require(path.join(dir, file))(sequelize, DataTypes))
    .reduce((result, model) => ({
      ...result,
      [model.name]: model,
    }), {});

  Object.keys(models).forEach((modelName) => {
    if (!isNil(models[modelName].associate)) {
      models[modelName].associate(models);
    }
  });

  return {
    sequelize,
    ...models,
  };
};
