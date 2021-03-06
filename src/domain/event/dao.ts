import models from '../../driver/database';
import {
  FindAllFilter, FilterFindOne, Save, Paginate, JoinParams,
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

const findOne = async (filter: FilterFindOne, withParticipants?: Boolean) => {
  const query = {
    where: {
      status: 'ACTIVE',
      ...filter,
    },
  };

  if (withParticipants) {
    Object.assign(query, {
      include: [{
        model: model.participants,
        as: 'participants',
      }],
    });
  }

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

const insertParticipant = async (params: JoinParams) => {
  const data = { ...params };

  const participant = await model.participants.create(data);

  return participant;
};

export default {
  findAll,
  findOne,
  save,
  softDelete,
  insertParticipant,
};
