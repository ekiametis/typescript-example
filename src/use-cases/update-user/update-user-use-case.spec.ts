import { expect } from 'chai';
import { udpateUserUseCase } from '.';
import { MemoryUserRepository } from '../../repositories/user/memory-user-repository';
import { createRequestContext } from '../../utils/context/request-context';
import { createUserUseCase } from '../create-user';

describe('Update User Tests', () => {

    beforeEach(() => {
        createRequestContext({});
        MemoryUserRepository
            .build()
            .deleteAll();
    });

    it('should update a user with success', async () => {
        const payload = { name: 'Emmanuel Kiametis', email: 'kiametis91@gmail.com', birthdate: '1992-07-28' }
        const createdUser = await createUserUseCase.execute(payload);
        const update = { id: createdUser.id, birthdate: '1991-08-28' }
        const updatedUser = await udpateUserUseCase.execute(update);
        expect(updatedUser).have.property('id');
        expect(updatedUser.name).to.be.eq(createdUser.name);
        expect(updatedUser.email).to.be.eq(createdUser.email);
        expect(updatedUser.birthdate).to.be.not.eq(createdUser.birthdate);
    });
})