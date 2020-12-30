import { IUserRepository } from "../../repositories/user/user-repository";
import { IListUserRequestDTO, ListUserResponseDTO, IListUserResponseDTO } from "./list-users-dto";

export class ListUsersUseCase {

    private constructor(private userRepository: IUserRepository) {}

    static build(userRepository: IUserRepository): ListUsersUseCase {
        return new ListUsersUseCase(userRepository);
    }

    async execute(data: IListUserRequestDTO): Promise<IListUserResponseDTO> {
        const users = await this.userRepository.findAll();
        const response = ListUserResponseDTO.build(users);
        return response.listAll();
    }
}