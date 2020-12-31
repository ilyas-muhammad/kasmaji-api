import * as path from 'path';
import { isNil } from 'ramda';
import { Sequelize } from 'sequelize';
import { DbConfigItemType } from './config';

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

  const dir: string = `${__dirname}/${db.ns}`;

  const models = files
    .map((file) => sequelize.import(path.join(dir, file)))
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
