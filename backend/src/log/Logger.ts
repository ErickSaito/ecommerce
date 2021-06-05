import debug from 'debug';
import { v1 } from 'uuid';

export const ErrorLogger =
  typeof process.env.NDD_PPID === 'undefined' ? debug('ERROR') : console.error;

export const DebugLogger =
  typeof process.env.NDD_PPID === 'undefined' ? debug('DEBUG') : console.log;

export const ServiceLogger =
  (service) =>
  (tid: string) =>
  (method: string, ...args: any[]) =>
    DebugLogger(
      `${new Date().toISOString()} ${tid} ${service} ${method} ${'%o '.repeat(
        (args || []).length
      )}`,
      ...args
    );

export const LoggerMid =
  (tid: string) =>
  (method: string, ...args: any[]) =>
    DebugLogger(
      `${new Date().toISOString()} ${tid}   ${method} ${'%o '.repeat(
        (args || []).length
      )}`,
      ...args
    );

export const ContextLoggerBuild =
  (callerId: string, logger = DebugLogger) =>
  (action = '', transactionId = v1()) =>
  (logTxt: string, ...args: any[]) => {
    logger(
      `TID=${transactionId} ${callerId}${
        action ? ` ${action} ` : ' '
      }${logTxt}`,
      ...args
    );
  };
