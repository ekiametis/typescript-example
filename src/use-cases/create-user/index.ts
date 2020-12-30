import { IUserRepository } from "../../repositories/user/user-repository";
import { MemoryUserRepository } from "../../repositories/user/memory-user-repository";
import { CreateUserUseCase } from "./create-user-use-case";
import { CreateUserController } from "./create-user-controller";

const userRepository: IUserRepository = MemoryUserRepository.build();

const createUserUseCase = CreateUserUseCase.build(userRepository);

const createUserController: CreateUserController = CreateUserController.build(createUserUseCase);

export { createUserUseCase, createUserController }