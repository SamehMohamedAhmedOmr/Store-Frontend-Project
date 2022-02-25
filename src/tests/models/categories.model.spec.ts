import CategoriesRepository from "../../repositories/categories.repository";

const _repo = new CategoriesRepository();

let model_id: number;

describe('Category Model TEST', () => {

    it('ALL', async () => {
        const model = await _repo.index();

        expect(model).toBeInstanceOf(Array);
    });

    it('STORE', async () => {
        let data = {
            'name': "CAT_TEST"
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
            'name': "CAT_TEST"
        };
        const model = await _repo.update(data, model_id);

        expect(model).toBeInstanceOf(Object);
    });

});



