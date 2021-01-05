import models from '../../driver/database';
import { FindAllFilter, Save, Paginate } from './types';

const {
  main: model,
} = models;

const findAll = async (
  pagination?: Paginate,
  filterCriteria?: FindAllFilter,
  sortingCriteria?: Array<string[]>,
) => {
  const query = {
    limit: pagination.limit,
    offset: pagination.skip,
    where: {
      status: 'ACTIVE',
      ...filterCriteria,
    },
    order: sortingCriteria,
  };
  const result = await model.events.findAndCountAll(query);

  return result;
};

const findOne = async (filterCriteria?: FindAllFilter) => {
  const result = await model.events.findOne(filterCriteria);

  return result;
};

const save = async (params: Save) => {
  const result = await model.events.create(params);

  return result;
};

const softDelete = async (uuid: string) => {
  const result = await model.events.update({
    status: 'DELETED',
    deletedAt: new Date(),
  }, {
    where: { uuid },
  });

  return result;
};

export default {
  findAll,
  findOne,
  save,
  softDelete,
};
