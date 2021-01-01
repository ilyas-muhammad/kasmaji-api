import dao from './dao';
import { FindAllFilter, Save as SaveParams } from './types';

const getEvents = async (filterCriteria?: FindAllFilter) => {
  const dataFound = await dao.findAll(filterCriteria);

  if (!dataFound) return { status: false, message: 'DB Error' };

  return { status: true, data: dataFound };
};

const createEvent = async (params: SaveParams) => {
  const inserted = await dao.save(params);

  if (!inserted) return { status: false, message: 'DB Error' };

  return { status: true, data: inserted };
};

export default {
  getEvents,
  createEvent,
};
