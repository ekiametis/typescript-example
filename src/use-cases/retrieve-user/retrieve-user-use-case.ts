import { IUserRepository } from "../../repositories/user/user-repository";
import { IRetrieveUserRequestDTO, IRetrieveUserResponseDTO } from "./retrieve-user-dto";
import { UserNotFound } from "../../exceptions/users/user-not-found";
import { getRequestContext } from "../../utils/context/request-context";
import { IContext } from "../../components/context/context";
import { ILogger } from "../../components/logger/logger";
import { getLoggerStore } from "../../config";
import { IUseCaseService } from "../../components/service/use-case-service";

const logger: ILogger = getLoggerStore('system');
const loggerError: ILogger = getLoggerStore('systemError');

export class RetrieveUserUseCase implements IUseCaseService<IRetrieveUserRequestDTO, IRetrieveUserResponseDTO> {

    private constructor(private userRepository: IUserRepository) {}

    static build(userRepository: IUserRepository): RetrieveUserUseCase {
        return new RetrieveUserUseCase(userRepository);
    }

    async execute(data: IRetrieveUserRequestDTO): Promise<IRetrieveUserResponseDTO> {
        const context: IContext = getRequestContext();
        logger.info(`[retrieve-user-use-case][handle][CorrelationId] - ${context.correlationId}`);
        const user = await this.userRepository.findById(data.id);
        if(!user) {
            throw new UserNotFound(`User does not exist.`);
        }
        return user;
    }
}