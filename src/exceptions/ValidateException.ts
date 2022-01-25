import { ResponseBase } from '../bo/models/ResponseBase';
import { ResponseMsg } from '../consts/ResponseMsg';
import HttpException from './HttpException';

export default class ValidateException extends HttpException {
  // eslint-disable-next-line
  constructor(message: number | string, data?: any) {
    // eslint-disable-next-line
    const resData: ResponseBase<any> = new ResponseBase<any>(0, message, data);
    super(400, ResponseMsg.INVALID_REQUEST, resData);
  }
}
