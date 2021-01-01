import { Sequelize } from 'sequelize';
import dbConfig from './dbConfig';
import loader from './loader';

interface MainType {
  sequelize: any;
  events: any;
}

const main: MainType = loader(dbConfig, [
  'events',
]);

interface ModelsType {
  Sequelize: any;
  main: MainType;
}

const models: ModelsType = {
  Sequelize,
  main,
};

export default models;
