// import * as changeCase from 'change-case';
// import requireDir from 'require-dir';
import { Request, Response, Express } from 'express';
import multer from 'multer';
import * as path from 'path';
import validator from './validation/event';
import eventBiz from '../../../domain/event/business';
import { log } from '../../../helper/logger';

export default (app: Express) => {
  // const routes = requireDir('./');
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/images');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  });

  // eslint-disable-next-line max-len
  const fileFilter = (_: any, file: { mimetype: string; }, cb: (arg0: null, arg1: boolean) => void) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };

  const upload = multer({ storage, fileFilter });

  // Initialize all routes
  // Object.keys(routes).forEach((routeName) => {
  //   const endpoint = changeCase.paramCase(routeName);

  //   app.use(`/${endpoint}`, routes[routeName].default());
  // });

  app
    .get('/events',
      async (req: Request, res: Response) => {
        const result = await eventBiz.getEvents({ ...req.body, ...req.query });
        const statusCode = (!result.status) ? 500 : 200;

        return res.status(statusCode).json(result);
      });

  app
    .get('/event/:uuid([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})',
      async (req: Request, res: Response) => {
        const { uuid } = req.params;
        const result = await eventBiz.getEventByUUID(uuid);
        const statusCode = (!result.status) ? 404 : 200;

        return res.status(statusCode).json(result);
      });

  app
    .get('/event/nearest',
      async (req: Request, res: Response) => {
        const result = await eventBiz.getNearestEvents();
        const statusCode = (!result.status) ? 400 : 200;

        return res.status(statusCode).json(result);
      });

  app
    .post('/event',
      upload.single('image'),
      validator.createEvent,
      async (req: Request, res: Response) => {
        const { tid } = res.locals;
        log('info', 'create-event-input', { body: req.body, tid });

        const targetPath = `images/${req.file.filename}`;

        const params = { ...req.body, image: targetPath };
        const result = await eventBiz.createEvent(params);

        const statusCode = (!result.status) ? 500 : 200;

        return res.status(statusCode).json(result);
      });

  app
    .delete('/event/:uuid',
      async (req: Request, res: Response) => {
        const { uuid } = req.params;
        const result = await eventBiz.deleteEventByUUID(uuid);
        const statusCode = (!result.status) ? 400 : 200;

        return res.status(statusCode).json(result);
      });

  app
    .post('/event/join',
      validator.joinEvent,
      async (req: Request, res: Response) => {
        const { eventId: uuid } = req.body;
        const result = await eventBiz.joinEvent({ ...req.body }, uuid);

        const statusCode = (!result.status) ? 500 : 200;

        return res.status(statusCode).json(result);
      });

  app.get('/', (_: Request, res: Response) => res.send('Kasmaji API'));
};
