import { app } from "./app";
import { getLoggerStore } from "./config";
import { ILogger } from "./components/logger/logger";

const logger: ILogger = getLoggerStore('system');
const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
    logger.info(`Application is listening on port ${PORT}`);
});