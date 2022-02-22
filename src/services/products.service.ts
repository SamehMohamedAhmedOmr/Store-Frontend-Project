import { Request, Response } from 'express';
import ProductsRepository from '../repositories/products.repository';
import { ProductsModel } from '../models/products.model';

const _repo = new ProductsRepository();

export default class ProductsService {
  static index = async (req: Request): Promise<ProductsModel[]> => {
    const category_id = req.query.category_id;
    let filter_object = {};
    if (category_id) {
      filter_object = {
        category_id: category_id,
      };
      return await _repo.index(filter_object);
    }
    return await _repo.index();
  };

  static get = async (req: Request): Promise<ProductsModel | null> => {
    const { id } = req.params;
    const model = await _repo.get(parseInt(id));
    if (!model) {
      return null;
    }

    let new_model = {
      views: model.views + 1,
    };
    return await _repo.update(new_model, Number(id));
  };

  static create = async (
    req: Request,
    res: Response
  ): Promise<ProductsModel | null> => {
    const model = req.body;
    return await _repo.create(model);
  };

  static update = async (req: Request): Promise<ProductsModel | null> => {
    const model = req.body;
    const model_id = req.params.id;
    return await _repo.update(model, Number(model_id));
  };

  static mostViewed = async (): Promise<ProductsModel[]> => {
    return await _repo.mostViewed(5);
  };
}
