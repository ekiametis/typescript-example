import path from 'path';
import express from 'express';
import './config';
import { router } from './routes/user/user-route';
import { errorHandlingMiddleware } from './middlewares/error-handling-middleware';
import { requestContextMiddleware } from './middlewares/request-context-middleware';
import { openApiValidatorMiddleware } from './middlewares/open-api-middleware';

const CURRENT_VERSION = process.env.CURRENT_VERSION;

const app = express();
app.use(express.json());
app.use(openApiValidatorMiddleware(path.join(__dirname, `openapi/openapi-${CURRENT_VERSION}.yaml`)))
app.use(requestContextMiddleware);
app.use(`/${CURRENT_VERSION}`, router);
app.use(errorHandlingMiddleware);

export { app }