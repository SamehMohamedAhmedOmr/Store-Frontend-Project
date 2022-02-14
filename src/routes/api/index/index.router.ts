import express, { Request, Response } from 'express';

import users_route from '../users/users.router';

const routes = express.Router();

routes.get('/', (req: Request, res: Response): void => {
  res.send('Main APIs router');
});

routes.use('/api/users', users_route);

export default routes;
