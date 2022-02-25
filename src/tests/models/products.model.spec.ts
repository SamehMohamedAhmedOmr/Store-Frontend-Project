import ProductsRepository from "../../repositories/products.repository";

const _repo = new ProductsRepository();

let model_id: number;

describe('Products Model TEST', () => {

    it('ALL', async () => {
        const model = await _repo.index();

        expect(model).toBeInstanceOf(Array);
    });

    it('Most viewed', async () => {
        const model = await _repo.mostViewed();

        expect(model).toBeInstanceOf(Array);
    });

    it('STORE', async () => {
        let data = {
            "name": "Product 15",
            "price" : 10,
            "category_id" : 1
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
            "name": "Product 15",
            "price" : 10,
            "category_id" : 1
        };
        const model = await _repo.update(data, model_id);

        expect(model).toBeInstanceOf(Object);
    });

});



