import { IUserRepository } from "./user-repository";
import { User } from "../../entities/user";

export class MemoryUserRepository implements IUserRepository {

    users: User[] = [];
    
    findByEmail(email: string): Promise<User> {
        return new Promise((resolve) => {
            const userFound = this.users.find(u => u.email === email);
            resolve(userFound);
        });
    }

    save(user: User): Promise<User> {
        return new Promise((resolve) => {
            this.users.push(user);
            resolve(user);
        })
    }

    findById(id: string): Promise<User> {
        return new Promise((resolve) => {
            const userFound = this.users.find(u => u.id === id);
            resolve(userFound);
        });
    }

}