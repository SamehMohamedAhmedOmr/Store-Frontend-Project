import {Request, Response} from 'express';
import CartRepository from "../repositories/cart.repository";
import CartItemsRepository from "../repositories/cart.items.repository";
import {CartItemsModel} from "../models/cart.items.model";

const _repo = new CartRepository();
const cartItemsRepository = new CartItemsRepository();

export default class CartService {
    static index = async (req: Request, res: Response): Promise<CartItemsModel[]> => {
        const user = res.locals.user;
        let cartModel = await _repo.get(user.id, 'user_id');
        if (!cartModel) {
            cartModel = await _repo.create({user_id : user.id});
        }

        let filter_object = {
            cart_id : cartModel.id,
            user_id : user.id
        };
        return await cartItemsRepository.index(filter_object);
    };

    static create = async (req: Request, res: Response): Promise<CartItemsModel | null> => {
        const user = res.locals.user;
        let cartModel = await _repo.get(user.id, 'user_id');
        if (!cartModel) {
            cartModel = await _repo.create({user_id : user.id});
        }

        const target_model = req.body;
        target_model.cart_id = cartModel.id;

        let check_cart_item = await cartItemsRepository.checkCARTITEM(
            cartModel.id, 'cart_id',
            target_model.product_id, 'product_id'
        );

        if (check_cart_item) {
            return await cartItemsRepository.update(target_model, <number>check_cart_item.id);
        }
        return await cartItemsRepository.create(target_model);
    };

    static update = async (req: Request, res: Response): Promise<CartItemsModel> => {
        const product_id = Number(req.params.id);

        const user = res.locals.user;
        let cartModel = await _repo.get(user.id, 'user_id');
        if (!cartModel) {
            cartModel = await _repo.create({user_id : user.id});
        }

        return  await cartItemsRepository.deleteCARTITEM(
            cartModel.id, 'cart_id',
            product_id, 'product_id'
        );
    };

}
