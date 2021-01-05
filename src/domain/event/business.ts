import { defaultTo, isNil } from 'ramda';
import { Op } from 'sequelize';
import moment from 'moment';
import dao from './dao';
import { Save as SaveParams, GetEventParams } from './types';
import utils from './utils';

const getEvents = async (getEventsParams: GetEventParams) => {
  const pagination = {
    limit: defaultTo(5, +getEventsParams.size),
    skip: defaultTo(0, +getEventsParams.page),
  };

  const date = defaultTo(getEventsParams.date, getEventsParams.month);
  const filter = {
    date: {
      [Op.between]: [
        moment(date)
          .startOf(!isNil(getEventsParams.month) ? 'month' : 'day')
          .toDate(),
        moment(date)
          .endOf(!isNil(getEventsParams.month) ? 'month' : 'day')
          .toDate(),
      ],
    },
  };

  const dataFound = await dao.findAll(pagination, !isNil(date) ? filter : null);

  if (!dataFound) return { status: false, data: [], message: 'DB Error' };

  const dataWithPagination = utils.getPagingData(dataFound, pagination.skip, pagination.limit);
  return { status: true, ...dataWithPagination };
};

const getEventByUUID = async (uuid: string) => {
  const dataFound = await dao.findAll(null, { uuid });

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

const getNearestEvents = async () => {
  const paginate = {
    skip: 0,
    limit: 5,
  };

  const filter = {
    date: {
      [Op.gte]: new Date(),
    },
  };

  const sort = [
    ['date', 'ASC'],
  ];

  const events = await dao.findAll(paginate, filter, sort);

  if (!events) return { status: false, message: 'Not Found' };

  const dataWithPagination = utils.getPagingData(events, paginate.skip, paginate.limit);

  return { status: true, ...dataWithPagination };
};

export default {
  getEvents,
  getEventByUUID,
  createEvent,
  deleteEventByUUID,
  getNearestEvents,
};
