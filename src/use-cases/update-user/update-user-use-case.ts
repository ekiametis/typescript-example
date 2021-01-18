import { IUserRepository } from "../../repositories/user/user-repository";
import { IUpdateUserRequestDTO, IUpdateUserResponseDTO } from "./update-user-dto";
import { getLoggerStore } from "../../config";
import { ILogger } from "../../components/logger/logger";
import { IContext } from "../../components/context/context";
import { getRequestContext } from "../../utils/context/request-context";
import { UserNotFound } from "../../exceptions/users/user-not-found";
import { IUseCaseService } from "../../components/service/use-case-service";

const logger: ILogger = getLoggerStore('system');
const loggerError: ILogger = getLoggerStore('systemError');

export class UpdateUserUseCase implements IUseCaseService<IUpdateUserRequestDTO, IUpdateUserResponseDTO> {

    private constructor(private userRepository: IUserRepository) {}

    static build(userRepository: IUserRepository): UpdateUserUseCase {
        return new UpdateUserUseCase(userRepository);
    }

    async execute(data: IUpdateUserRequestDTO): Promise<IUpdateUserResponseDTO> {
        const context: IContext = getRequestContext();
        logger.info(`[update-user-use-case][handle][CorrelationId] - ${context.correlationId}`);
        const userFound = await this.userRepository.findById(data.id);
        if(!userFound) {
            throw new UserNotFound(`User does not exist.`);
        }
        const { id, ...update } = data;
        const userUpdated = await this.userRepository.updateById(id, update);
        return userUpdated;
    }
}