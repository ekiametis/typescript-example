import { NextFunction, Request, Response } from "express";
import { HttpStatusCode } from "../enums/http-status-code";
import { IHttpException, HttpException } from "../exceptions/http/http-exception";
import { HttpError } from 'express-openapi-validator/dist/framework/types';

const isOpenApiException = (err: Error): Boolean => {
    return ( err instanceof HttpError );
}

const errorHandlingMiddleware = (err: Error, req: Request, res: Response, next: NextFunction): void => {
    let httpStatusCode: HttpStatusCode = HttpStatusCode.INTERNAL_SERVER_ERROR;
    let payload: IHttpException = { httpStatusCode, errorCode: -1, errorMessage: err.message }
    if(err instanceof HttpException) {
        httpStatusCode = err.retrieveHttpStatusCode();
        payload = err.formatToJSON();
    } else if(isOpenApiException(err)) {
        const castError = <HttpError> err;
        const formattedError = HttpException.build(castError.status, 0, castError.message);
        httpStatusCode = formattedError.retrieveHttpStatusCode();
        payload = formattedError.formatToJSON();

    }
    res.status(httpStatusCode).json(payload);
    next();
}

export { errorHandlingMiddleware}