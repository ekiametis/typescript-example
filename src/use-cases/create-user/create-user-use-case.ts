import { IUserRepository } from "../../repositories/user/user-repository";
import { ICreateUserRequestDTO, ICreateUserResponseDTO } from "./create-user-dto";
import { UserAlreadyExist } from "../../exceptions/users/user-already-exists";
import { User } from "../../entities/user";

export class CreateUserUseCase {

    constructor(
        private userRepository: IUserRepository,
    ) {}

    async execute(data: ICreateUserRequestDTO): Promise<ICreateUserResponseDTO> {
        const userAlreadyExists = await this.userRepository.findByEmail(data.email);
        if(userAlreadyExists) {
            throw new UserAlreadyExist(`User already exists.`);
        }
        const user = new User(data);
        const userFound = await this.userRepository.save(user);
        return userFound;
    }
}