import { expect } from 'chai';
import { retrieveUserUseCase } from '.';
import { MemoryUserRepository } from '../../repositories/user/memory-user-repository';
import { createUserUseCase } from '../create-user';
import { UserNotFound } from '../../exceptions/users/user-not-found';

describe('Create User Tests', () => {

    beforeEach(() => {
        MemoryUserRepository
            .build()
            .deleteAll();
    })

    it('should capture the exception UserNotFound because there is no user registered', async () => {
        try {
            const criteria = { id: '0001' }
            await retrieveUserUseCase.execute(criteria);
        } catch(err) {
            expect(err).to.be.an.instanceof(UserNotFound);
        }
        
    });

    it('should list a user with success', async () => {
        const payload = { name: 'Emmanuel Kiametis', email: 'kiametis91@gmail.com', birthday: '1991-08-28' }
        const userRegistered = await createUserUseCase.execute(payload);
        const criteria = { id: userRegistered.id }
        const userFound = await retrieveUserUseCase.execute(criteria);
        expect(userFound).have.property('id');
        expect(userFound.id).to.be.eq(userRegistered.id);
    });
})