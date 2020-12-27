import { IUserRepository } from "../../repositories/user/user-repository";
import { MemoryUserRepository } from "../../repositories/user/memory-user-repository";
import { ListUsersUseCase } from "./list-users-use-case";
import { ListUsersController } from "./list-users-controller";

const userRepository: IUserRepository = MemoryUserRepository.build();

const listUsersUseCase: ListUsersUseCase = new ListUsersUseCase(userRepository);

const listUsersController: ListUsersController = new ListUsersController(listUsersUseCase);

export { listUsersUseCase, listUsersController }