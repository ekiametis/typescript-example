import { Request, Response, NextFunction } from "express";
import { HttpStatusCode } from "../../enums/http-status-code";
import { RetrieveUserUseCase } from "./retrieve-user-use-case";
import { getLoggerStore } from "../../config";
import { ILogger } from "../../components/logger/logger";
import { IContext } from "../../components/context/context";
import { getRequestContext } from "../../utils/context/request-context";
import { UserNotFound } from "../../exceptions/users/user-not-found";
import { HttpException } from "../../exceptions/http/http-exception";

const logger: ILogger = getLoggerStore('system');
const loggerError: ILogger = getLoggerStore('systemError');

export class RetrieveUserController {

    private constructor (private service: RetrieveUserUseCase) {
        this.handle = this.handle.bind(this);
    }

    static build(service: RetrieveUserUseCase): RetrieveUserController {
        return new RetrieveUserController(service);
    }

    async handle (req: Request, res: Response, next: NextFunction): Promise<Response> {
        const context: IContext = getRequestContext();
        logger.info(`[retrieve-user-controller][handle][CorrelationId] - ${context.correlationId}`);
        try {
            const criteria = { id: req.params.id }
            const response = await this.service.execute(criteria);
            return res.status(HttpStatusCode.SUCCESS).json(response);
        } catch(err) {
            loggerError.error(`[retrieve-user-controller][handle][CorrelationId] - ${context.correlationId} - ${err}`);
            let formattedError = err;
            if(err instanceof UserNotFound) {
                formattedError = HttpException.build(HttpStatusCode.NOT_FOUND, 1000, err.message);
            }
            next(formattedError);
        }
    }
}