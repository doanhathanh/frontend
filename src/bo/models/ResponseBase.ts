import { ResponseMsg } from '../../consts/ResponseMsg';

export class ResponseBase<T> {
  status = 1;
  message: number | string = ResponseMsg.SUCCEED;
  data: T = undefined;

  constructor(status?: number, message?: number | string, data?: T) {
    this.status = status === undefined ? 1 : status;
    this.message = message === undefined ? ResponseMsg.SUCCEED : message;
    this.data = data;
  }
}
