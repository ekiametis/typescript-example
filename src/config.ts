import { Log4JSLoggerConfigurator } from "./utils/logger/log4js-logger";
import { LoggerStore } from "./utils/logger/logger";
import { ILogger } from "./components/logger/logger";

let loggerStore: LoggerStore;

const setup = (): void => {
    loggerStore = Log4JSLoggerConfigurator
    .build()
    .setup()
    .getLoggerStore();
}

setup();

export const getLoggerStore = (categoryName: string): ILogger => {
    return loggerStore.getLogger(categoryName);
}

export default {
    getLoggerStore,
}