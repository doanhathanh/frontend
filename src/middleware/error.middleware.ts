import HttpException from '../exceptions/HttpException';
import { Request, Response, NextFunction } from 'express';
import Log from '../utils/Log';
import ValidateException from '../exceptions/ValidateException';
import AppException from '../exceptions/AppException';
import { ResponseBase } from '../bo/models/ResponseBase';
import { ResponseMsg } from '../consts/ResponseMsg';

// eslint-disable-next-line
export const errorHandler = (error: ValidateException | AppException | HttpException, req: Request, res: Response, next: NextFunction): void => {
  console.log(error);
  const status = error.statusCode || 500;
  Log.error('middleware', 'errorHandler', error, { json: true, jwtPayload: res?.locals?.jwtPayload, req: req });

  if (error.data) {
    res.status(status).json(error.data);
  } else {
    // eslint-disable-next-line
    const errorData: ResponseBase<any> = new ResponseBase<any>(0, ResponseMsg.BAD_REQUEST, null);
    res.status(status).json(errorData);
  }
};
