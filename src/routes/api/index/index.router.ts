import express, { Request, Response } from 'express';

import users_route from '../users.router';
import authentication_route from '../auth/auth.routes';
import categories_route from '../categories.router';
import products_route from '../products.router';
import products_most_viewed_route from '../products.views.router';
import cart_route from '../cart.router';
import order_route from '../order.router';

const routes = express.Router();

routes.get('/', (req: Request, res: Response): void => {
  res.send('Main APIs router');
});

routes.use('/auth', authentication_route);

routes.use('/users', users_route);
routes.use('/categories', categories_route);
routes.use('/products', products_route);
routes.use('/products-most-viewed', products_most_viewed_route);
routes.use('/cart', cart_route);
routes.use('/orders', order_route);

export default routes;
