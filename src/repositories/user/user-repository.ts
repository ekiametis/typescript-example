import { User } from "../../entities/user";
import { IRepository } from "../repository";

export interface IUserRepository extends IRepository<User, string>{
    findByEmail(email: string): Promise<User>;
}