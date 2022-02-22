import { NextFunction, Request, Response } from 'express';
import { response } from '../helpers/reponse.helper';
import { VALIDATION_RESPONSE } from '../helpers/status.codes.helper';
import UsersRepository from '../repositories/users.repository';
import { email_regex, strong_password_regex } from '../helpers/regex';

const _repo = new UsersRepository();

const createRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { first_name, last_name, email, type, password } = req.body;

  const errorsBag = [];

  if (!first_name) {
    errorsBag.push('First Name is required');
  } else {
    if (first_name.length < 3) {
      errorsBag.push('First Name  must be at least 3 characters long');
    }

    if (first_name.length > 255) {
      errorsBag.push('First Name  must be less than 255 characters long');
    }
  }

  if (!last_name) {
    errorsBag.push('Last Name is required');
  } else {
    if (last_name.length < 3) {
      errorsBag.push('Last Name  must be at least 3 characters long');
    }

    if (last_name.length > 255) {
      errorsBag.push('Last Name  must be less than 255 characters long');
    }
  }

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

  if (type == null) {
    errorsBag.push('Type is required');
  } else {
    if (type != 0 && type != 1) {
      errorsBag.push('Type should be 0 or 1');
    }
  }

  return errorsBag.length > 0
    ? response(VALIDATION_RESPONSE, res, errorsBag)
    : next();
};

// * validate update request
const UpdateRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { first_name, last_name, email, type, password } = req.body;
  const errorsBag = [];

  if (first_name) {
    if (first_name.length < 3) {
      errorsBag.push('First Name  must be at least 3 characters long');
    }

    if (first_name.length > 255) {
      errorsBag.push('First Name  must be less than 255 characters long');
    }
  }

  if (last_name) {
    if (last_name.length < 3) {
      errorsBag.push('Last Name  must be at least 3 characters long');
    }

    if (last_name.length > 255) {
      errorsBag.push('Last Name  must be less than 255 characters long');
    }
  }

  if (email) {
    if (!email_regex.test(email)) {
      errorsBag.push('Please Enter Valid Email');
    }

    const model = await _repo.get(email, 'email');
    if (model) {
      if (model.id != Number(req.params.id)) {
        errorsBag.push('Email is already taken');
      }
    }
  }

  if (password) {
    if (password.length < 8) {
      errorsBag.push('Password must be at least 8 characters long');
    }

    if (!strong_password_regex.test(password)) {
      errorsBag.push(
        'Password must contain at least one lowercase letter, one uppercase letter, one number and one special character'
      );
    }
  }

  if (type != null) {
    if (type != 0 && type != 1) {
      errorsBag.push('Type should be 0 or 1');
    }
  }

  return errorsBag.length > 0
    ? response(VALIDATION_RESPONSE, res, errorsBag)
    : next();
};

export { createRequest, UpdateRequest };
