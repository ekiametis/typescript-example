import { CreateUserUseCase } from "./create-user-use-case";
import { Request, Response, NextFunction } from "express";
import { UserAlreadyExist } from "../../exceptions/users/user-already-exists";
import { HttpStatusCode } from "../../enums/http-status-code";
import { HttpException } from "../../exceptions/http/http-exception";
import { getRequestContext } from "../../utils/context/request-context";
import { IContext } from "../../components/context/context";
import { getLoggerStore } from "../../config";
import { ILogger } from "../../components/logger/logger";

const logger: ILogger = getLoggerStore('system');
const loggerError: ILogger = getLoggerStore('systemError');

export class CreateUserController {

    private constructor (private service: CreateUserUseCase) {
        this.handle = this.handle.bind(this);
    }

    static build(service: CreateUserUseCase): CreateUserController {
        return new CreateUserController(service);
    }

    async handle (req: Request, res: Response, next: NextFunction): Promise<Response> {
        const context: IContext = getRequestContext();
        logger.info(`[create-user-controller][handle][CorrelationId] - ${context.correlationId}`);
        const { name, email, birthdate } = req.body;
        try {
            const response = await this.service.execute({ name, email, birthdate });
            return res.status(HttpStatusCode.CREATED).json(response);
        } catch(err) {
            loggerError.error(`[create-user-controller][handle][CorrelationId] - ${context.correlationId} - ${err}`);
            let formattedError = err;
            if(err instanceof UserAlreadyExist) {
                formattedError = HttpException.build(HttpStatusCode.CONFLICT, 1000, err.message);
            }
            next(formattedError);
        }
    }
}