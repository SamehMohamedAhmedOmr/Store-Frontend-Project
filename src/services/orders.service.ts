import {Request, Response} from 'express';
import CartRepository from "../repositories/cart.repository";
import CartItemsRepository from "../repositories/cart.items.repository";
import OrdersRepository from "../repositories/orders.repository";
import OrdersItemsRepository from "../repositories/orders.items.repository";
import {OrderItemsModel} from "../models/order.items.model";
import {OrdersModel} from "../models/orders.model";

const cartRepository = new CartRepository();
const cartItemsRepository = new CartItemsRepository();

const ordersRepository = new OrdersRepository();
const ordersItemsRepository = new OrdersItemsRepository();

export default class OrdersService {
    static index = async (req: Request, res: Response): Promise<OrdersModel[]> => {
        const user = res.locals.user;
        let filter_object = {
            user_id: user.id
        };
        return await ordersRepository.index(filter_object);
    };

    static orderItems = async (req: Request, res: Response): Promise<OrderItemsModel[]> => {
        let filter_object = {
            order_id: req.params.id
        };
        return await ordersItemsRepository.index(filter_object);
    };

    static create = async (req: Request, res: Response): Promise<OrdersModel | null> => {
        const user = res.locals.user;
        let cartModel = await cartRepository.get(user.id, 'user_id');
        if (!cartModel) {
            cartModel = await cartRepository.create({user_id: user.id});
        }

        let filter_object = {
            cart_id: cartModel.id,
            user_id: user.id
        };
        let cart_items = await cartItemsRepository.index(filter_object);

        if (cart_items.length) {
            let ordersModel = await ordersRepository.create({user_id: user.id, status: 0});
            for (const item of cart_items) {
                let cart_item_model: OrderItemsModel = {
                    order_id: Number(ordersModel.id),
                    product_id: item.product_id,
                    quantity: item.quantity
                };
                await ordersItemsRepository.create(cart_item_model);
            }
            await cartItemsRepository.clearCart(
                cartModel.id, 'cart_id',
            );
            return ordersModel;
        }
        return null;
    };
}
