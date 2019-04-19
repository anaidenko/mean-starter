import chalk from 'chalk';
import { Request, Response } from 'express';
import * as customError from 'http-errors';

import { Env } from '../../config';

import ErrorPayload from './ErrorPayload';

const provideStacktrace = Env === 'development';

export function expressHandler(error: any, req: Request, res: Response, next) {
  return errorHandler(res, error);
}

export function errorHandler(res: Response, error: any = {}) {
  let payload: ErrorPayload;
  let code: number;

  if (error instanceof customError.HttpError) {
    const httpError = error as customError.HttpError;
    code = httpError.status || 500;
    payload = {
      name: httpError.name,
      message: httpError.message || (httpError.error && httpError.error.message) || 'Server Error',
      error: httpError.error || httpError
    };
  } else {
    code = 500;
    payload = {
      name: 'InternalServerError',
      message: 'Something went wrong on server side... please try again later.',
      error
    };
  }

  errorLog(error, payload);

  if (provideStacktrace) {
    payload.stack = payload.error.stack;
  }

  delete payload.error; // since underlying JSON.stringify can't serialize errors
  res.status(code).json(payload);
}

function errorLog(error: Error, payload: ErrorPayload) {
  const errorCode = `Server Error: ${payload.name}`;
  const errorHead = formatError(`\n-----\n${errorCode}\n-----\n`);
  console.error(errorHead);

  const errorBody = formatError(error.stack || error.message || payload.message);
  console.error(errorBody + '\n');

  const innerErrorBody = (error as any).error ? formatError('Inner Error:', (error as any).error.stack) : null;
  if (innerErrorBody) {
    console.error(indent(innerErrorBody, 5) + '\n');
  }
}

function formatError(message, ...args) {
  return chalk.bold.red.bgBlack(message, ...args);
}

function indent(text: string, numSpaces: number) {
  if (!text) {
    return text;
  }
  const spaces = new Array(numSpaces).join(' ');
  return spaces + text.replace(/(\n)/g, '$1' + spaces);
}
