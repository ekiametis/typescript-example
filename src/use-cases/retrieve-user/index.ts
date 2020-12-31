import { IUserRepository } from "../../repositories/user/user-repository";
import { MemoryUserRepository } from "../../repositories/user/memory-user-repository";
import { RetrieveUserUseCase } from "./retrieve-user-use-case";
import { RetrieveUserController } from "./retrieve-user-controller";

const userRepository: IUserRepository = MemoryUserRepository.build();

const retrieveUserUseCase: RetrieveUserUseCase = RetrieveUserUseCase.build(userRepository);

const retrieveUserController: RetrieveUserController = RetrieveUserController.build(retrieveUserUseCase);

export { retrieveUserUseCase, retrieveUserController }