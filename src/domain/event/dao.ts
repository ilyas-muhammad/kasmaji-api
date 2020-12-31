import models from '../../driver/database';

const {
  main: model,
} = models;

interface findAllFilter {
    offset: number,
}

const findAll = async (filterCriteria?: findAllFilter) => {
  const result = await model.events.findAll(filterCriteria);

  return result;
};

export default {
  findAll,
};
