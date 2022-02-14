import { Request, Response } from 'express';
import UsersRepository from '../repositories/users.repository';
import { User } from '../models/user.model';

const _repo = new UsersRepository();

export default class UsersService {
  static index = async (): Promise<User[]> => {
    return await _repo.index();
  };

  static get = async (req: Request): Promise<User | null> => {
    const { id } = req.params;
    const post = await _repo.get(parseInt(id));
    if (!post) {
      return null;
    }
    return post;
  };

  static create = async (req: Request, res: Response): Promise<User | null> => {
    const post = req.body;
    const user = res.locals.user;
    post.user_id = user.id;
    return await _repo.create(post);
  };

  static update = async (req: Request): Promise<User | null> => {
    const post = req.body;
    return await _repo.update(post);
  };
}
