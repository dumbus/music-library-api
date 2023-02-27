import { LoggerService } from '@nestjs/common';
import { statSync, appendFileSync, openSync, existsSync } from 'node:fs';

const logLevels = ['error', 'warn', 'log', 'debug'];

const currentLogLevel = process.env.LOGGER_LEVEL;
const maxLogFileSize = Number(process.env.MAX_LOG_FILE_SIZE);

export class CustomLoggerService implements LoggerService {
  level: number;
  appLogFileName: string;
  errorLogFileName: string;

  constructor() {
    this.level = logLevels.indexOf(currentLogLevel || 'error');
    this.appLogFileName = `./logs/${new Date().toISOString()}-app.log`;
    this.errorLogFileName = `./logs/${new Date().toISOString()}-error.log`;
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

  debug(message: any) {
    this.writeLog(3, `DEBUG: ${message.toString()}`);
  }

  rotateLogFile(type: 'log' | 'error') {
    if (type === 'log') {
      if (existsSync(this.appLogFileName)) {
        const currentFileSize = statSync(this.appLogFileName).size;

        if (currentFileSize > maxLogFileSize) {
          this.appLogFileName = `./logs/${new Date().toISOString()}-app.log`;
        }
      } else {
        openSync(this.appLogFileName, 'a');
      }
    }

    if (type === 'error') {
      if (existsSync(this.errorLogFileName)) {
        const currentFileSize = statSync(this.errorLogFileName).size;

        if (currentFileSize > maxLogFileSize) {
          this.errorLogFileName = `./logs/${new Date().toISOString()}-error.log`;
        }
      } else {
        openSync(this.errorLogFileName, 'a');
      }
    }
  }

  writeLog(level: number, message: any) {
    const timestamp = new Date().toISOString();
    const logMessage = `${timestamp} - ${message.toString()} \n`;

    if (level <= this.level) {
      this.rotateLogFile('log');
      appendFileSync(this.appLogFileName, logMessage);
    }

    if (level <= 1) {
      this.rotateLogFile('error');
      appendFileSync(this.errorLogFileName, logMessage);
    }
  }
}
