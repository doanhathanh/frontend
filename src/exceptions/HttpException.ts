import { ResponseBase } from '../bo/models/ResponseBase';

export default class HttpException extends Error {
  statusCode: number;
  // eslint-disable-next-line
  data: ResponseBase<any>;

  // eslint-disable-next-line
  constructor(status: number, message: string, data: ResponseBase<any>) {
    super(message);

    this.statusCode = status || 500;
    this.data = data;
  }
}
