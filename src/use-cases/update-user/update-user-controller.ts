import { UpdateUserUseCase } from "./update-user-use-case";
import { Request, Response, NextFunction } from "express";
import { UserAlreadyExist } from "../../exceptions/users/user-already-exists";
import { HttpStatusCode } from "../../enums/http-status-code";
import { HttpException } from "../../exceptions/http/http-exception";
import { getRequestContext } from "../../utils/context/request-context";
import { IContext } from "../../components/context/context";
import { getLoggerStore } from "../../config";
import { ILogger } from "../../components/logger/logger";
import { UserNotFound } from "../../exceptions/users/user-not-found";
import { IUseCaseController } from "../../components/controller/controller";

const logger: ILogger = getLoggerStore('system');
const loggerError: ILogger = getLoggerStore('systemError');

export class UpdateUserController implements IUseCaseController {

    private constructor (private service: UpdateUserUseCase) {
        this.handle = this.handle.bind(this);
    }

    static build(service: UpdateUserUseCase): UpdateUserController {
        return new UpdateUserController(service);
    }

    async handle (req: Request, res: Response, next: NextFunction): Promise<Response> {
        const context: IContext = getRequestContext();
        logger.info(`[update-user-controller][handle][CorrelationId] - ${context.correlationId}`);
        const { id } = req.params;
        const { name, email, birthdate } = req.body;
        const data = { id, name, email, birthdate }
        try {
            const response = await this.service.execute(data);
            return res.status(HttpStatusCode.SUCCESS).json(response);
        } catch(err) {
            loggerError.error(`[update-user-controller][handle][CorrelationId] - ${context.correlationId} - ${err}`);
            let formattedError = err;
            if(err instanceof UserNotFound) {
                formattedError = HttpException.build(HttpStatusCode.NOT_FOUND, 4000, err.message);
            }
            next(formattedError);
        }
    }
}