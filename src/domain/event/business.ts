import dao from './dao';
import { FindAllFilter, Save as SaveParams } from './types';

const getEvents = async (filterCriteria?: FindAllFilter) => {
  const dataFound = await dao.findAll(filterCriteria);

  if (!dataFound) return { status: false, message: 'DB Error' };

  const mappedData = dataFound.map((item) => ({
    imageUrl: process.env.APP_URI + item.dataValues.image,
    ...item.dataValues,
  }));

  return { status: true, data: mappedData };
};

const getEventByUUID = async (filterCriteria?: FindAllFilter) => {
  const dataFound = await dao.findOne(filterCriteria);

  if (!dataFound) return { status: false, message: 'Not Found' };

  return { status: true, data: dataFound };
};

const createEvent = async (params: SaveParams) => {
  const inserted = await dao.save(params);

  if (!inserted) return { status: false, message: 'DB Error' };

  return { status: true, data: inserted };
};

const deleteEventByUUID = async (uuid: string) => {
  const deleted = await dao.softDelete(uuid);

  if (!deleted) return { status: false, message: 'DB Error' };

  return { status: true, message: 'OK' };
};

export default {
  getEvents,
  getEventByUUID,
  createEvent,
  deleteEventByUUID,
};
