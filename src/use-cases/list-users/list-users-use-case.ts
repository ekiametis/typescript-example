import { IUserRepository } from "../../repositories/user/user-repository";
import { IListUserRequestDTO, ListUserResponseDTO, IListUserResponseDTO } from "./list-users-dto";

export class ListUsersUseCase {

    constructor(
        private userRepository: IUserRepository,
    ) {}

    async execute(data: IListUserRequestDTO): Promise<IListUserResponseDTO> {
        const users = await this.userRepository.findAll();
        const response = new ListUserResponseDTO(users);
        return response.listAll();
    }
}