import { createWriteStream, WriteStream } from 'node:fs';
import { LoggerService } from '@nestjs/common';
import { stat } from 'node:fs/promises';

const logLevels = ['error', 'warn', 'log'];

const currentLogLevel = process.env.LOGGER_LEVEL;

const maxLogFileSize = Number(process.env.MAX_LOG_FILE_SIZE);

export class CustomLoggerService implements LoggerService {
  level: number;
  appLogFileName: string;
  errorLogFileName: string;
  appLogFileStream: WriteStream;
  errorLogFileStream: WriteStream;

  constructor() {
    this.level = logLevels.indexOf(currentLogLevel || 'error');
    this.appLogFileName = `./logs/${new Date().toISOString()}-app.log`;
    this.errorLogFileName = `./logs/${new Date().toISOString()}-error.log`;
    this.appLogFileStream = createWriteStream(this.appLogFileName, {
      flags: 'a',
    });
    this.errorLogFileStream = createWriteStream(this.errorLogFileName, {
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

  async rotateLogFile(type: 'log' | 'error') {
    if (type === 'log') {
      const currentFileSize = (await stat(this.appLogFileName)).size;

      if (currentFileSize > maxLogFileSize) {
        this.appLogFileName = `./logs/${new Date().toISOString()}-app.log`;

        this.appLogFileStream = createWriteStream(this.appLogFileName, {
          flags: 'a',
        });
      }
    }

    if (type === 'error') {
      const currentFileSize = (await stat(this.errorLogFileName)).size;

      if (currentFileSize > maxLogFileSize) {
        this.errorLogFileName = `./logs/${new Date().toISOString()}-error.log`;

        this.errorLogFileStream = createWriteStream(this.errorLogFileName, {
          flags: 'a',
        });
      }
    }
  }

  writeLog(level: number, message: any) {
    if (level <= this.level) {
      const timestamp = new Date().toISOString();
      const logMessage = `${timestamp} - ${message.toString()} \n`;

      if (level === 0) {
        this.rotateLogFile('error');
        this.errorLogFileStream.write(logMessage);
      }

      this.rotateLogFile('log');
      this.appLogFileStream.write(logMessage);
    }
  }
}
