import { ResponseBase } from '../bo/models/ResponseBase';
import { ResponseMsg } from '../consts/ResponseMsg';
import HttpException from './HttpException';

export default class AppException extends HttpException {
  // eslint-disable-next-line
  constructor(message: string, data?: any) {
    // eslint-disable-next-line
    const resData: ResponseBase<any> = new ResponseBase<any>(0, ResponseMsg.BAD_REQUEST, data);
    super(400, message || ResponseMsg.BAD_REQUEST, resData);
  }
}
