import { expect } from 'chai';
import { createUserUseCase } from '.';
import { UserAlreadyExist } from '../../exceptions/users/user-already-exists';
import { MemoryUserRepository } from '../../repositories/user/memory-user-repository';
import { createRequestContext } from '../../utils/context/request-context';

describe('Create User Tests', () => {

    beforeEach(() => {
        createRequestContext({});
        MemoryUserRepository
            .build()
            .deleteAll();
    });

    it('should create a user with success', async () => {
        const payload = { name: 'Emmanuel Kiametis', email: 'kiametis91@gmail.com', birthday: '1991-08-28' }
        const user = await createUserUseCase.execute(payload);
        expect(user).have.property('id');
        expect(user.name).to.be.eq(payload.name);
        expect(user.email).to.be.eq(payload.email);
        expect(user.birthday).to.be.eq(payload.birthday);
    });

    it('should not create a user because he already exists', async () => {
        try {
            const payload = { name: 'Emmanuel Kiametis', email: 'kiametis91@gmail.com', birthday: '1991-08-28' }
            await createUserUseCase.execute(payload);
            await createUserUseCase.execute(payload);
        } catch(err) {
            expect(err).to.be.an.instanceof(UserAlreadyExist);
        }
    });
})