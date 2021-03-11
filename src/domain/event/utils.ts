const mappingData = (events) => events.map((item) => ({
  ...item.dataValues,
  imageUrl: process.env.APP_URI + item.dataValues.image,
}));

const getPagingData = (data, page, limit) => {
  const { count, rows: events } = data;
  const currentPage = page ? +page : 0;
  const totalPage = Math.ceil(count / limit);

  const mappedEvents = mappingData(events);

  return {
    count, events: mappedEvents, totalPage, currentPage,
  };
};

const mapEventData = (event) => {
  const result = event.dataValues;
  result.imageUrl = process.env.APP_URI + event.dataValues.image;

  return result;
};

export default {
  getPagingData,
  mapEventData,
};
