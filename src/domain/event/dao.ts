import models from '../../driver/database';
import { FindAllFilter, Save } from './types';

const {
  main: model,
} = models;

const findAll = async (filterCriteria?: FindAllFilter) => {
  const result = await model.events.findAll(filterCriteria);

  return result;
};

const save = async (params: Save) => {
  const result = await model.events.create(params);

  return result;
};

export default {
  findAll,
  save,
};
