import { IUserRepository } from "../../repositories/user/user-repository";
import { IListUserRequestDTO, ListUserResponseDTO, IListUserResponseDTO } from "./list-users-dto";
import { getLoggerStore } from "../../config";
import { ILogger } from "../../components/logger/logger";
import { IContext } from "../../components/context/context";
import { getRequestContext } from "../../utils/context/request-context";
import { IUseCaseService } from "../../components/service/use-case-service";

const logger: ILogger = getLoggerStore('system');
const loggerError: ILogger = getLoggerStore('systemError');

export class ListUsersUseCase implements IUseCaseService<IListUserRequestDTO, IListUserResponseDTO> {

    private constructor(private userRepository: IUserRepository) {}

    static build(userRepository: IUserRepository): ListUsersUseCase {
        return new ListUsersUseCase(userRepository);
    }

    async execute(data: IListUserRequestDTO): Promise<IListUserResponseDTO> {
        const context: IContext = getRequestContext();
        logger.info(`[list-users-use-case][handle][CorrelationId] - ${context.correlationId}`);
        const users = await this.userRepository.find(data);
        const response = ListUserResponseDTO.build(users);
        return response.listAll();
    }
}