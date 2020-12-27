import express from 'express';
import { router } from './routes/user/user-route';
import { errorHandlingMiddleware } from './middlewares/error-handling-middleware';

const app = express();

app.use(express.json());
app.use(router);

app.use(errorHandlingMiddleware);

export { app }