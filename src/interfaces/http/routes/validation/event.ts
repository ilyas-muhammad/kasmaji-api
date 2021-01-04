import { body } from 'express-validator';
import validate from './validator';

const createEvent = validate([
  body('title').not().isEmpty().withMessage('title is required'),
  body('description').isString().withMessage('desc is required'),
  body('image').notEmpty().withMessage('image is required'),
  body('date').isISO8601().withMessage('should receive date with format yyyy-mm-dd hh:mm:ss'),
  body('location').optional().isString(),
]);

const getDetailEvent = validate([
  body('id').isNumeric(),
]);

export default {
  createEvent,
  getDetailEvent,
};
