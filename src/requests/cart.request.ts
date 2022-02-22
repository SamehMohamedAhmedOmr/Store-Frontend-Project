import { NextFunction, Request, Response } from 'express';
import { response } from '../helpers/reponse.helper';
import { VALIDATION_RESPONSE } from '../helpers/status.codes.helper';
import ProductsRepository from '../repositories/products.repository';

const _repo = new ProductsRepository();

const createRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { product_id, quantity } = req.body;

  const errorsBag = [];

  if (!quantity) {
    errorsBag.push('quantity is required');
  } else {
    if (isNaN(quantity)) {
      errorsBag.push('quantity must be a number');
    }

    if (quantity <= 0) {
      errorsBag.push('quantity must greater than 0');
    }
  }

  if (!product_id) {
    errorsBag.push('Product is required');
  } else {
    if (isNaN(product_id)) {
      errorsBag.push('Please Select Valid Product');
    }
    const productsModel = await _repo.get(product_id);

    if (!productsModel) {
      errorsBag.push('Please Select Valid Product');
    }
  }

  return errorsBag.length > 0
    ? response(VALIDATION_RESPONSE, res, errorsBag)
    : next();
};

// * validate update request
const deleteRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const product_id = Number(req.params.id);
  const errorsBag = [];

  if (product_id) {
    if (isNaN(product_id)) {
      errorsBag.push('Please Select Valid Product');
    }
    const productsModel = await _repo.get(product_id);

    if (!productsModel) {
      errorsBag.push('Please Select Valid Product');
    }
  }

  return errorsBag.length > 0
    ? response(VALIDATION_RESPONSE, res, errorsBag)
    : next();
};

export { createRequest, deleteRequest };
