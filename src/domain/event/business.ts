import dao from './dao';

const getEvents = async () => {
  const dataFound = await dao.findAll();

  if (!dataFound) return { status: false, message: 'DB Error' };

  return { status: true, data: dataFound };
};

export default {
  getEvents,
};
