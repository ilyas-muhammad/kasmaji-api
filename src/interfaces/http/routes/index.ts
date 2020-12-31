import * as changeCase from 'change-case';
import requireDir from 'require-dir';
import { Request, Response, Express } from 'express';

export default (app: Express) => {
  const routes = requireDir('./');

  app.get('/', (_: Request, res: Response) => res.send('Kasmaji API'));

  // Initialize all routes
  Object.keys(routes).forEach((routeName) => {
    const endpoint = changeCase.paramCase(routeName);

    app.use(`/${endpoint}`, routes[routeName].default());
  });
};
