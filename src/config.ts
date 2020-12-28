import { Log4JSLoggerConfigurator } from "./utils/logger/log4js-logger";
import { LoggerStore } from "./utils/logger/logger";

let loggerStore;

export const setup = (): Boolean => {
    loggerStore = Log4JSLoggerConfigurator.start().setup().getLoggerStore();
    return true;
}

export const getLoggerStore = (): LoggerStore => {
    return loggerStore;
}

export default {
    setup,
    getLoggerStore,
}