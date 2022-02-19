import express, { Request, Response } from 'express';

import users_route from '../users.router';
import authentication_route from '../auth/auth.routes';
import categories_route from '../categories.router';

const routes = express.Router();

routes.get('/', (req: Request, res: Response): void => {
  res.send('Main APIs router');
});

// routes.use('/users', users_route);
routes.use('/auth', authentication_route);
routes.use('/categories', categories_route);

export default routes;
