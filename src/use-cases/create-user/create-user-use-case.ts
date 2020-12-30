import { IUserRepository } from "../../repositories/user/user-repository";
import { ICreateUserRequestDTO, ICreateUserResponseDTO } from "./create-user-dto";
import { UserAlreadyExist } from "../../exceptions/users/user-already-exists";
import { User } from "../../entities/user";

export class CreateUserUseCase {

    private constructor(private userRepository: IUserRepository) {}

    static build(userRepository: IUserRepository): CreateUserUseCase {
        return new CreateUserUseCase(userRepository);
    }

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