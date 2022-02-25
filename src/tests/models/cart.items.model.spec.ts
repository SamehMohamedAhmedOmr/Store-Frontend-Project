import CartItemsRepository from "../../repositories/cart.items.repository";

const _repo = new CartItemsRepository();

let model_id: number;

describe('CART Items Model TEST', () => {

    it('ALL', async () => {
        const model = await _repo.index({
            'cart_id' : 1
        });

        expect(model).toBeInstanceOf(Array);
    });

    it('STORE', async () => {
        let data = {
            "cart_id": 1,
            "quantity": 15,
            "product_id": 1
        };
        const model = await _repo.create(data);

        model_id = Number(model.id);

        expect(model).toBeInstanceOf(Object);
    });


    it('GET', async () => {
        const model = await _repo.get(model_id);

        expect(model.id).toEqual(model_id);
    });


    it('update', async () => {
        let data = {
            "cart_id": 1,
            "quantity": 15,
            "product_id": 1
        };
        const model = await _repo.update(data, model_id);

        expect(model).toBeInstanceOf(Object);
    });

});



