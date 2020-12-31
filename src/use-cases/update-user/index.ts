import { IUserRepository } from "../../repositories/user/user-repository";
import { MemoryUserRepository } from "../../repositories/user/memory-user-repository";
import { UpdateUserUseCase } from "./update-user-use-case";
import { UpdateUserController } from "./update-user-controller";

const userRepository: IUserRepository = MemoryUserRepository.build();

const udpateUserUseCase = UpdateUserUseCase.build(userRepository);

const updateUserController: UpdateUserController = UpdateUserController.build(udpateUserUseCase);

export { udpateUserUseCase, updateUserController }