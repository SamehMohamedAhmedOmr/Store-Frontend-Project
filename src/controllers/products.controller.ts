import { Request, Response } from 'express';
import { response } from '../helpers/reponse.helper';
import {
  SUCCESS,
  INTERNAL_SERVER_ERROR,
  NOF_FOUND,
  VALIDATION_RESPONSE,
} from '../helpers/status.codes.helper';
import ProductsService from '../services/products.service';

const _service = ProductsService;

export default class ProductsController {
  static index = async (req: Request, res: Response) => {
    try {
      const model = await _service.index(req);
      return response(SUCCESS, res, model);
    } catch (error) {
      return response(INTERNAL_SERVER_ERROR, res, error);
    }
  };

  static get = async (req: Request, res: Response) => {
    try {
      const model = await _service.get(req);
      if (!model) {
        return response(NOF_FOUND, res, [], 'NO Product FOUND');
      }
      return response(SUCCESS, res, model);
    } catch (error) {
      return response(INTERNAL_SERVER_ERROR, res, error);
    }
  };

  static create = async (req: Request, res: Response): Promise<void> => {
    try {
      const model = await _service.create(req);
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
      const model = await _service.update(req);
      if (model) {
        return response(SUCCESS, res, model);
      } else {
        return response(
          VALIDATION_RESPONSE,
          res,
          model,
          'Cannot update new one'
        );
      }
    } catch (error) {
      return response(INTERNAL_SERVER_ERROR, res, error);
    }
  };

  static mostViewed = async (req: Request, res: Response) => {
    try {
      const model = await _service.mostViewed();
      return response(SUCCESS, res, model);
    } catch (error) {
      return response(INTERNAL_SERVER_ERROR, res, error);
    }
  };
}
