import { Request, Response } from 'express';
import { response } from '../helpers/reponse.helper';
import {
  SUCCESS,
  INTERNAL_SERVER_ERROR,
  VALIDATION_RESPONSE,
} from '../helpers/status.codes.helper';
import AuthenticationService from '../services/authentication.service';

const _service = AuthenticationService;
export default class AuthenticationController {
  static login = async (req: Request, res: Response) => {
    try {
      const model = await _service.login(req);
      if (model) {
        return response(SUCCESS, res, model, 'Login successful');
      } else {
        return response(VALIDATION_RESPONSE, res, model, 'Invalid Credentials');
      }
    } catch (error) {
      return response(INTERNAL_SERVER_ERROR, res, error);
    }
  };

  static register = async (req: Request, res: Response) => {
    try {
      const model = await _service.register(req);
      if (model) {
        return response(SUCCESS, res, model, 'Register successful');
      } else {
        return response(
          VALIDATION_RESPONSE,
          res,
          model,
          'Cannot register new user'
        );
      }
    } catch (error) {
      return response(INTERNAL_SERVER_ERROR, res, error);
    }
  };
}
