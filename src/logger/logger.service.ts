import { createWriteStream, WriteStream } from 'node:fs';
import { LoggerService } from '@nestjs/common';

const logLevels = ['error', 'warn', 'log'];

const currentLogLevel = process.env.LOGGER_LEVEL;

export class CustomLoggerService implements LoggerService {
  level: number;
  appLogFileStream: WriteStream;
  errorLogFileStream: WriteStream;

  constructor() {
    this.level = logLevels.indexOf(currentLogLevel || 'error');
    this.appLogFileStream = createWriteStream('./logs/app.log', {
      flags: 'a',
    });
    this.errorLogFileStream = createWriteStream('./logs/error.log', {
      flags: 'a',
    });
  }

  error(message: any) {
    this.writeLog(0, `ERROR: ${message.toString()}`);
  }

  warn(message: any) {
    this.writeLog(1, `WARN: ${message.toString()}`);
  }

  log(message: any) {
    this.writeLog(2, `LOG: ${message.toString()}`);
  }

  writeLog(level: number, message: any) {
    if (level <= this.level) {
      const timestamp = new Date().toISOString();
      const logMessage = `${timestamp} - ${message.toString()} \n`;

      console.log(logMessage);

      if (level === 0) {
        this.errorLogFileStream.write(logMessage);
      }

      this.appLogFileStream.write(logMessage);
    }
  }
}
