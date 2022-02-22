import { NextFunction, Request, Response } from 'express';
import UsersRepository from '../repositories/users.repository';
import { response } from '../helpers/reponse.helper';
import { VALIDATION_RESPONSE } from '../helpers/status.codes.helper';
import {
  email_regex,
  no_number_regex,
  strong_password_regex,
} from '../helpers/regex';

const _repo = new UsersRepository();

const loginRequest = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  const errorsBag = [];

  if (!email) {
    errorsBag.push('Email is required');
  }

  if (!password) {
    errorsBag.push('Password is required');
  }

  if (email) {
    if (!email_regex.test(email)) {
      errorsBag.push('Please Enter Valid Email');
    }
  }

  return errorsBag.length > 0
    ? response(VALIDATION_RESPONSE, res, errorsBag)
    : next();
};

const registerRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, first_name, last_name, password } = req.body;

  const errorsBag = [];

  if (!email) {
    errorsBag.push('Email is required');
  } else {
    if (!email_regex.test(email)) {
      errorsBag.push('Please Enter Valid Email');
    }

    if (await _repo.get(email, 'email')) {
      errorsBag.push('Email is already taken');
    }
  }

  if (!first_name) {
    errorsBag.push('First name is required');
  } else {
    if (first_name.length < 2) {
      errorsBag.push('First name must be at least 2 characters');
    }

    // no numbers
    if (!no_number_regex.test(last_name)) {
      errorsBag.push('First name must contain only letters');
    }
  }

  if (!last_name) {
    errorsBag.push('Last name is required');
  } else {
    if (last_name.length < 2) {
      errorsBag.push('Last name must be at least 2 characters');
    }

    // no numbers
    if (!no_number_regex.test(last_name)) {
      errorsBag.push('Last name must contain only letters');
    }
  }

  if (!password) {
    errorsBag.push('Password is required');
  } else {
    if (password.length < 8) {
      errorsBag.push('Password must be at least 8 characters long');
    }

    if (!strong_password_regex.test(password)) {
      errorsBag.push(
        'Password must contain at least one lowercase letter, one uppercase letter, one number and one special character'
      );
    }
  }

  return errorsBag.length > 0
    ? response(VALIDATION_RESPONSE, res, errorsBag)
    : next();
};

export { loginRequest, registerRequest };
