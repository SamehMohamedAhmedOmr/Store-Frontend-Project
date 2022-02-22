import { NextFunction, Request, Response } from 'express';
import { response } from '../helpers/reponse.helper';
import { VALIDATION_RESPONSE } from '../helpers/status.codes.helper';
import CategoriesRepository from '../repositories/categories.repository';

const _repo = new CategoriesRepository();

const createRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name } = req.body;

  const errorsBag = [];

  if (!name) {
    errorsBag.push('Name is required');
  } else {
    if (name.length < 2) {
      errorsBag.push('Name must be at least 2 characters long');
    }

    if (name.length > 255) {
      errorsBag.push('Name must be less than 255 characters long');
    }
  }

  return errorsBag.length > 0
    ? response(VALIDATION_RESPONSE, res, errorsBag)
    : next();
};

// * validate update request
const updateRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name } = req.body;
  const errorsBag = [];

  if (!name) {
    errorsBag.push('Name is required');
  } else {
    if (name.length < 2) {
      errorsBag.push('Name must be at least 2 characters long');
    }

    if (name.length > 255) {
      errorsBag.push('Name must be less than 255 characters long');
    }
  }

  return errorsBag.length > 0
    ? response(VALIDATION_RESPONSE, res, errorsBag)
    : next();
};

export { createRequest, updateRequest };
