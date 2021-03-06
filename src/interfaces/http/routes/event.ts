import express, { Request, Response } from 'express';
import multer from 'multer';
import * as path from 'path';
import validator from './validation/event';
import eventBiz from '../../../domain/event/business';
import { log } from '../../../helper/logger';

export default () => {
  const router = express.Router();
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(process.cwd(), 'public', 'images'));
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  });

  const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };

  const upload = multer({ storage, fileFilter });

  router
    .route('/')
    .get(
      async (req: Request, res: Response) => {
        const result = await eventBiz.getEvents({ ...req.body, ...req.query });
        const statusCode = (!result.status) ? 500 : 200;

        return res.status(statusCode).json(result);
      },
    );

  router
    .route('/:uuid([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})')
    .get(
      async (req: Request, res: Response) => {
        const { uuid } = req.params;
        const result = await eventBiz.getEventByUUID(uuid);
        const statusCode = (!result.status) ? 404 : 200;

        return res.status(statusCode).json(result);
      },
    );

  router
    .route('/nearest')
    .get(
      async (req: Request, res: Response) => {
        const result = await eventBiz.getNearestEvents();
        const statusCode = (!result.status) ? 400 : 200;

        return res.status(statusCode).json(result);
      },
    );

  router
    .route('/')
    .post(
      upload.single('image'),
      validator.createEvent,
      async (req: Request, res: Response) => {
        const { tid } = res.locals;
        log('info', 'create-event-input', { body: req.body, tid });

        const targetPath = `public/images/${req.file.originalname}`;

        const params = { ...req.body, image: targetPath };
        const result = await eventBiz.createEvent(params);

        const statusCode = (!result.status) ? 500 : 200;

        return res.status(statusCode).json(result);
      },
    );

  router
    .route('/:uuid')
    .delete(
      async (req: Request, res: Response) => {
        const { uuid } = req.params;
        const result = await eventBiz.deleteEventByUUID(uuid);
        const statusCode = (!result.status) ? 400 : 200;

        return res.status(statusCode).json(result);
      },
    );

  router
    .route('/join')
    .post(
      validator.joinEvent,
      async (req: Request, res: Response) => {
        const { eventId: uuid } = req.body;
        const result = await eventBiz.joinEvent({ ...req.body }, uuid);

        const statusCode = (!result.status) ? 500 : 200;

        return res.status(statusCode).json(result);
      },
    );

  return router;
};
