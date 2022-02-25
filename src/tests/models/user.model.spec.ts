import UsersRepository from "../../repositories/users.repository";

const _repo = new UsersRepository();

let model_id: number;

describe('User Model TEST', () => {

    it('ALL', async () => {
        const model = await _repo.index();

        expect(model).toBeInstanceOf(Array);
    });

    it('GET', async () => {
        const model = await _repo.get('sameh@gmail.com', 'email');

        expect(model.email).toContain('sameh@gmail.com');
    });

    it('STORE', async () => {
        let data = {
            'email': "TEST1020@gmail.com",
            "first_name": "SSS",
            "last_name": "sss",
            "type": 0,
            "password": "Same._omar_4&"
        };
        const model = await _repo.create(data);

        model_id = Number(model.id);

        expect(model).toBeInstanceOf(Object);
    });

    it('update', async () => {
        let data = {
            "first_name": "SSS",
            "last_name": "sss",
            "type": 0,
            "password": "Same._omar_4&"
        };
        const model = await _repo.update(data, model_id);

        expect(model).toBeInstanceOf(Object);
    });

});



