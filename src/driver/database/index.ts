import { Sequelize } from 'sequelize';
import dbConfig from './config';
import loader from './loader';

interface LegacyType {
  sequelize: any;
  events: any;
}

const legacy: LegacyType = loader(dbConfig, [
  'events',
]);

interface ModelsType {
  Sequelize: any;
  legacy: LegacyType;
}

const models: ModelsType = {
  Sequelize,
  legacy,
};

export default models;
