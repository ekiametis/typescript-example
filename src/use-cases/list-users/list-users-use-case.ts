import { IUserRepository } from "../../repositories/user/user-repository";
import { IListUserRequestDTO, ListUserResponseDTO, IListUserResponseDTO } from "./list-users-dto";
import { getLoggerStore } from "../../config";
import { ILogger } from "../../components/logger/logger";
import { IContext } from "../../components/context/context";
import { getRequestContext } from "../../utils/context/request-context";

const logger: ILogger = getLoggerStore('system');
const loggerError: ILogger = getLoggerStore('systemError');

export class ListUsersUseCase {

    private constructor(private userRepository: IUserRepository) {}

    static build(userRepository: IUserRepository): ListUsersUseCase {
        return new ListUsersUseCase(userRepository);
    }

    async execute(data: IListUserRequestDTO): Promise<IListUserResponseDTO> {
        const context: IContext = getRequestContext();
        logger.info(`[list-users-use-case][handle][CorrelationId] - ${context.correlationId}`);
        const users = await this.userRepository.findAll();
        const response = ListUserResponseDTO.build(users);
        return response.listAll();
    }
}