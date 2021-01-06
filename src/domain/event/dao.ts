import models from '../../driver/database';
import {
  FindAllFilter, FilterFindOne, Save, Paginate,
} from './types';

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

const findOne = async (filter: FilterFindOne) => {
  const query = {
    where: {
      status: 'ACTIVE',
      ...filter,
    },
  };

  const result = await model.events.findOne(query);

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
