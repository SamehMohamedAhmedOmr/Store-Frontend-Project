import { Request, Response } from 'express';
import { response } from '../helpers/reponse.helper';
import {
  SUCCESS,
  INTERNAL_SERVER_ERROR,
  NOF_FOUND,
  VALIDATION_RESPONSE,
} from '../helpers/status.codes.helper';
import CartService from "../services/cart.service";

const _service = CartService;

export default class CartController {
  static index = async (req: Request, res: Response) => {
    try {
      const model = await _service.index(req, res);
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
        return response(
          VALIDATION_RESPONSE,
          res,
          model,
          'Cannot create new one'
        );
      }
    } catch (error) {
      return response(INTERNAL_SERVER_ERROR, res, error);
    }
  };

  static update = async (req: Request, res: Response) => {
    try {
      const model = await _service.update(req, res);
      return response(SUCCESS, res, model, 'Delete item successfully');
    } catch (error) {
      return response(INTERNAL_SERVER_ERROR, res, error);
    }
  };
}
