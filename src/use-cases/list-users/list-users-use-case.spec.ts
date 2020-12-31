import { expect } from 'chai';
import { listUsersUseCase } from '.';
import { MemoryUserRepository } from '../../repositories/user/memory-user-repository';
import { createUserUseCase } from '../create-user';

describe('Create User Tests', () => {

    beforeEach(() => {
        MemoryUserRepository
            .build()
            .deleteAll();
    })

    it('should list an empty list of users with success', async () => {
        const queryParams = {}
        const response = await listUsersUseCase.execute(queryParams);
        expect(response).has.property('list');
        expect(response.list).to.be.an('array');
        expect(response.list.length).to.be.eq(0);
    });

    it('should list a user with success', async () => {
        const payload = { name: 'Emmanuel Kiametis', email: 'kiametis91@gmail.com', birthday: '1991-08-28' }
        await createUserUseCase.execute(payload);
        const queryParams = {}
        const response = await listUsersUseCase.execute(queryParams);
        expect(response).has.property('list');
        expect(response.list).to.be.an('array');
        expect(response.list.length).to.be.eq(1);
    });
})