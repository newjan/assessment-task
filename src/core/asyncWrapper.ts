import { Request, Response, NextFunction } from 'express';
import logger from './logger';

// Wraps async functions, catching all errors and sending them forward to express error handler
export default function asyncWrap(controller: CallableFunction) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await controller(req, res, next);
      logger.info(`${req.path} \nRequest: ${JSON.stringify(req.body)} \nHeaders:${JSON.stringify(req.headers)}\nParams: ${JSON.stringify(req.params)} \nResponse: ${JSON.stringify(res.statusCode)}`)
    } catch (error) {
      next(error);
    }
  };
}
