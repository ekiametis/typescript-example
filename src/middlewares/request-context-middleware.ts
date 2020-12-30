import { NextFunction, Request, Response } from "express";
import { createRequestContext } from "../utils/context/request-context";

const requestContextMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    createRequestContext(req);
    next();
}

export { requestContextMiddleware }