import { Request, Response } from 'express';
import CategoriesRepository from '../repositories/categories.repository';
import { CategoriesModel } from '../models/categories.model';

const _repo = new CategoriesRepository();

export default class CategoriesService {
  static index = async (): Promise<CategoriesModel[]> => {
    return await _repo.index();
  };

  static get = async (req: Request): Promise<CategoriesModel | null> => {
    const { id } = req.params;
    const model = await _repo.get(parseInt(id));
    if (!model) {
      return null;
    }
    return model;
  };

  static create = async (
    req: Request,
    res: Response
  ): Promise<CategoriesModel | null> => {
    const model = req.body;
    return await _repo.create(model);
  };

  static update = async (req: Request): Promise<CategoriesModel | null> => {
    const { name } = req.body;
    const model_id = req.params.id;

    let model: CategoriesModel = {
      name: name,
    };

    return await _repo.update(model, Number(model_id));
  };
}
