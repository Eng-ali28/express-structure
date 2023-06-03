import winston from 'winston';
import config from 'config';
import { MongoDB } from "winston-mongodb";

process.on('unhandledRejection' , (err) => {
  logger.error('unhandledRejection:' + err);
});

winston.addColors({
    error: "bold red",
    warn: "yellow",
    info: "green",
    verbose: "dim white",
    debug: "gray",
    silly: "magenta",  
})

const logger = winston.createLogger({
    level: "info",
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.timestamp(),
      winston.format.align(),
      winston.format.printf(
        (info) => `${info.timestamp} ${info.level}: ${info.message} ${info.meta ? info.meta : ""}`
      )
    ),
    transports: [
      new winston.transports.File({
        level: "error",
        filename: "./src/logging/logs/" + config.get("logging.error_log_file_name"),
      }),
      new winston.transports.File({
        filename: "./src/logging/logs/" + config.get("logging.combined_log_file_name"),
      }),
      new MongoDB({
        level: "error",
        db:  config.get<string>('DB_URI') + config.get<string>('DB_PORT') + config.get<string>('DB_NAME'),
        options: { useNewUrlParser: true, useUnifiedTopology: true  },
        collection: config.get("logging.mongodb_collection"),
      }),
      new winston.transports.Console({}),
    ],
    exceptionHandlers: [
      new winston.transports.File({
        filename: "./src/logging/logs/" + config.get("logging.exception_log_file_name"),
      }),
    ],
})

export default logger;