import { IUserRepository } from "../../repositories/user/user-repository";
import { ICreateUserRequestDTO, ICreateUserResponseDTO } from "./create-user-dto";
import { UserAlreadyExist } from "../../exceptions/users/user-already-exists";
import { User } from "../../entities/user";
import { getLoggerStore } from "../../config";
import { ILogger } from "../../components/logger/logger";
import { IContext } from "../../components/context/context";
import { getRequestContext } from "../../utils/context/request-context";

const logger: ILogger = getLoggerStore('system');
const loggerError: ILogger = getLoggerStore('systemError');

export class CreateUserUseCase {

    private constructor(private userRepository: IUserRepository) {}

    static build(userRepository: IUserRepository): CreateUserUseCase {
        return new CreateUserUseCase(userRepository);
    }

    async execute(data: ICreateUserRequestDTO): Promise<ICreateUserResponseDTO> {
        const context: IContext = getRequestContext();
        logger.info(`[create-user-use-case][handle][CorrelationId] - ${context.correlationId}`);
        const userAlreadyExists = await this.userRepository.findByEmail(data.email);
        if(userAlreadyExists) {
            throw new UserAlreadyExist(`User already exists.`);
        }
        const user = new User(data);
        const userFound = await this.userRepository.save(user);
        return userFound;
    }
}