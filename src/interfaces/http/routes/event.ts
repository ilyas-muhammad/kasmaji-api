import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

export default () => {
  const router = express.Router();

  router
    .route('/')
    .post(
      body('title').isLength({ min: 5 }),
      async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
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
