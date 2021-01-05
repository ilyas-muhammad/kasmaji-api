import models from '../../driver/database';
import { FindAllFilter, Save, Paginate } from './types';

const {
  main: model,
} = models;

const findAll = async (pagination?: Paginate, filterCriteria?: FindAllFilter) => {
  const filter = {
    limit: pagination.limit,
    offset: pagination.skip,
    where: {
      status: 'ACTIVE',
      ...filterCriteria,
    },
  };
  const result = await model.events.findAndCountAll(filter);

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
  save,
  softDelete,
};
