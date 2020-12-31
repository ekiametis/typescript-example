import { middleware } from 'express-openapi-validator';

export const openApiValidatorMiddleware = (openApiFile) => {
    return middleware({
        apiSpec: openApiFile,
        validateRequests: true,
        validateResponses: false,
    });
}

export default {
    openApiValidatorMiddleware,
}