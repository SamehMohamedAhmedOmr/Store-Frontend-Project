import { Request, Response } from 'express';
import { response } from '../helpers/reponse.helper';
import {
  SUCCESS,
  INTERNAL_SERVER_ERROR,
  VALIDATION_RESPONSE,
} from '../helpers/status.codes.helper';
import OrdersService from '../services/orders.service';

const _service = OrdersService;

export default class OrdersController {
  static index = async (req: Request, res: Response) => {
    try {
      const model = await _service.index(req, res);
      return response(SUCCESS, res, model);
    } catch (error) {
      return response(INTERNAL_SERVER_ERROR, res, error);
    }
  };

  static orderItems = async (req: Request, res: Response) => {
    try {
      const model = await _service.orderItems(req);
      return response(SUCCESS, res, model);
    } catch (error) {
      return response(INTERNAL_SERVER_ERROR, res, error);
    }
  };

  static create = async (req: Request, res: Response): Promise<void> => {
    try {
      const model = await _service.create(req, res);
      if (model) {
        return response(SUCCESS, res, model);
      } else {
        return response(VALIDATION_RESPONSE, res, model, 'Cart is Empty');
      }
    } catch (error) {
      return response(INTERNAL_SERVER_ERROR, res, error);
    }
  };
}
