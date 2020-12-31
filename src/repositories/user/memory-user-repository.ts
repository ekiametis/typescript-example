import { IUserRepository } from "./user-repository";
import { User } from "../../entities/user";

export class MemoryUserRepository implements IUserRepository {

    static instance: MemoryUserRepository;
    users: User[] = [];

    private constructor () {}

    static build() {
        if(!this.instance) {
            this.instance = new MemoryUserRepository()
        }
        return this.instance
    }
    
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

    findAll(): Promise<User[]> {
        return new Promise((resolve) => {
            resolve(this.users);
        })
    }

    find(query: Partial<User>): Promise<User[]> {
        return new Promise((resolve) => {
            let result = this.users;
            result = result.filter(u => {
                return (
                    Object.keys(query).length === 0 ||
                    query.id === u.id ||
                    query.name === u.name ||
                    query.email === u.email ||
                    query.birthday === u.birthday
                );
            });
            resolve(result);
        });
    }

    findOne(query: Partial<User>): Promise<User> {
        return new Promise((resolve) => {
            let result = this.users;
            result = result.filter(u => {
                return (
                    Object.keys(query).length === 0 ||
                    query.id === u.id ||
                    query.name === u.name ||
                    query.email === u.email ||
                    query.birthday === u.birthday
                );
            });
            resolve(result[0]);
        });
    }

    deleteById(id: string): Promise<User> {
        return new Promise((resolve) => {
            const user: User = this.users.find(u => u.id === id);
            this.users = this.users.splice(this.users.indexOf(user));
            resolve(user);
        })
    }

    deleteAll(): Promise<Number> {
        return new Promise((resolve) => {
            const sizeDeleted = this.users.length;
            this.users = [];
            resolve(sizeDeleted);
        })
    }
}