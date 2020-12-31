import express, { Request, Response } from 'express';
import validator from './validation/event';
import eventBiz from '../../../domain/event/business';

export default () => {
  const router = express.Router();

  router
    .route('/')
    .get(
      async (req: Request, res: Response) => {
        const result = await eventBiz.getEvents();
        const statusCode = (!result.status) ? 500 : 200;

        return res.status(statusCode).json(result);
      },
    );

  router
    .route('/')
    .post(
      validator.createEvent,
      async (req: Request, res: Response) => {
        const { tid } = res.locals;

        const result = {
          title: req.body.title,
          status: true,
          tid,
        };

        const statusCode = (!result.status) ? 500 : 200;

        return res.status(statusCode).json(result);
      },
    );

  return router;
};
