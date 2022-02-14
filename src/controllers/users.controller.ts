import { Request, Response } from 'express';
import UsersService from '../services/users.service';
import { response } from '../helpers/reponse.helper';
import {
  SUCCESS,
  INTERNAL_SERVER_ERROR,
  NOF_FOUND,
  VALIDATION_RESPONSE,
} from '../helpers/status.codes.helper';

const _service = UsersService;

export default class UsersController {
  static index = async (req: Request, res: Response) => {
    try {
      const model = await _service.index();
      return response(SUCCESS, res, model);
    } catch (error) {
      return response(INTERNAL_SERVER_ERROR, res, error);
    }
  };

  static get = async (req: Request, res: Response) => {
    try {
      const model = await _service.get(req);
      if (!model) {
        return response(NOF_FOUND, res);
      }
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
          'Cannot create new user'
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
          'Cannot update new user'
        );
      }
    } catch (error) {
      return response(INTERNAL_SERVER_ERROR, res, error);
    }
  };
}
