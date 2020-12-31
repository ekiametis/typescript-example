import { Request, Response, NextFunction } from "express";
import { HttpStatusCode } from "../../enums/http-status-code";
import { ListUsersUseCase } from "./list-users-use-case";
import { ILogger } from "../../components/logger/logger";
import { getLoggerStore } from "../../config";
import { getRequestContext } from "../../utils/context/request-context";
import { IContext } from "../../components/context/context";

const logger: ILogger = getLoggerStore('system');
const loggerError: ILogger = getLoggerStore('systemError');

export class ListUsersController {

    private constructor (private service: ListUsersUseCase) {
        this.handle = this.handle.bind(this);
    }

    static build(service: ListUsersUseCase): ListUsersController {
        return new ListUsersController(service);
    }

    async handle (req: Request, res: Response, next: NextFunction): Promise<Response> {
        const context: IContext = getRequestContext();
        logger.info(`[list-users-controller][handle][CorrelationId] - ${context.correlationId}`);
        try {
            const response = await this.service.execute(req.query);
            return res.status(HttpStatusCode.SUCCESS).json(response);
        } catch(err) {
            loggerError.error(`[list-users-controller][handle][CorrelationId] - ${context.correlationId} - ${err}`);
            next(err);
        }
    }
}