import { body } from 'express-validator';
import validate from './validator';

const createEvent = validate([
  body('title').not().isEmpty().withMessage('title is required'),
  body('description').isString().withMessage('desc is required'),
  // body('image').isMimeType().withMessage('image is required'),
  body('date').isISO8601().withMessage('should receive date with format yyyy-mm-dd hh:mm:ss'),
  body('location').optional().isString(),
]);

const getDetailEvent = validate([
  body('id').isNumeric(),
]);

const joinEvent = validate([
  body('eventId').isString().withMessage('eventId is required'),
  body('name').isString().withMessage('name is required'),
  body('phone').isString().withMessage('phone is required'),
  body('email').isEmail().withMessage('email is required'),
]);

export default {
  createEvent,
  getDetailEvent,
  joinEvent,
};
