import { NextFunction, Request, Response } from 'express';
import { response } from '../helpers/reponse.helper';
import { VALIDATION_RESPONSE } from '../helpers/status.codes.helper';
import CategoriesRepository from '../repositories/categories.repository';
import ProductsRepository from '../repositories/products.repository';

const _repo = new ProductsRepository();
const categoriesRepository = new CategoriesRepository();

const createRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, price, category_id } = req.body;

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

  if (!price) {
    errorsBag.push('Price is required');
  } else {
    if (isNaN(price)) {
      errorsBag.push('Price must be a number');
    }

    if (price <= 0) {
      errorsBag.push('Price must greater than 0');
    }
  }

  if (!category_id) {
    errorsBag.push('Category is required');
  } else {
    if (isNaN(price)) {
      errorsBag.push('Please Select Valid Category');
    }
    let categoriesModel = await categoriesRepository.get(category_id);

    if (!categoriesModel) {
      errorsBag.push('Please Select Valid Category');
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
  const { name, price, category_id } = req.body;
  const errorsBag = [];

  if (name) {
    if (name.length < 2) {
      errorsBag.push('Name must be at least 2 characters long');
    }

    if (name.length > 255) {
      errorsBag.push('Name must be less than 255 characters long');
    }
  }

  if (price) {
    if (isNaN(price)) {
      errorsBag.push('Price must be a number');
    }

    if (price < 0) {
      errorsBag.push('Price must greater than 0');
    }
  }

  if (category_id) {
    if (isNaN(category_id)) {
      errorsBag.push('Please Select Valid Category');
    }
    let categoriesModel = await categoriesRepository.get(category_id);

    if (!categoriesModel) {
      errorsBag.push('Please Select Valid Category');
    }
  }

  return errorsBag.length > 0
    ? response(VALIDATION_RESPONSE, res, errorsBag)
    : next();
};

const filterRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const category_id = Number(req.query.category_id);
  const errorsBag = [];

  if (category_id) {
    if (isNaN(category_id)) {
      errorsBag.push('Please Select Valid Category');
    }
    let categoriesModel = await categoriesRepository.get(category_id);

    if (!categoriesModel) {
      errorsBag.push('Please Select Valid Category');
    }
  }

  return errorsBag.length > 0
    ? response(VALIDATION_RESPONSE, res, errorsBag)
    : next();
};

export { createRequest, updateRequest, filterRequest };
