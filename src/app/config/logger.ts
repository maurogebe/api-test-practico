import winston from 'winston';

const logFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.printf(({ level, message, timestamp }) => {
    return `${timestamp} [${level.toUpperCase()}]: ${message}`;
  })
);

const transports: winston.transport[] = [
  new winston.transports.Console({ format: logFormat }),
];

const logger = winston.createLogger({
  level: 'info',
  format: logFormat,
  transports,
});

export default logger;
