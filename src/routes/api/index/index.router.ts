import express, { Request, Response } from 'express';

import users_route from '../users/users.router';
import authentication_route from '../auth/auth.routes';

const routes = express.Router();

routes.get('/', (req: Request, res: Response): void => {
  res.send('Main APIs router');
});

routes.use('/users', users_route);
routes.use('/auth', authentication_route);

export default routes;
