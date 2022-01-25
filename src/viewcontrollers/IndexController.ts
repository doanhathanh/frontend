import { Request, Response, NextFunction } from 'express';
import { Controller, Get } from '@overnightjs/core';
import { Service } from 'typedi';
import FileUtil from '../utils/FileUtil';
import Log from '../utils/Log';
import Axios, { AxiosRequestConfig } from 'axios';

@Service()
@Controller('')
export class IndexController {
  private className = 'IndexController';

  constructor() {}

  @Get()
  private async index(req: Request, res: Response, next: NextFunction): Promise<void> {
    Log.info(this.className, 'index', `RQ`);

    try {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      let html: string = FileUtil.ReadText(`views/index.html`);
      res.end(html);
    } catch (ex) {
      console.log(ex);
      next(ex);
    }
  }

  @Get('list')
  private async list(req: Request, res: Response, next: NextFunction): Promise<void> {
    Log.info(this.className, 'list', `RQ`);

    try {
      const config: AxiosRequestConfig = {
        method: 'GET',
        url: `${process.env.API_HOST}/api/v1/user/list`,
        headers: {
          'Content-Type': 'application/json'
        }
      };

      // eslint-disable-next-line
      const result: any = await Axios.request(config).catch((ex) => {
        throw ex;
      });

      res.writeHead(200, { 'Content-Type': 'text/html' });
      let html: string = FileUtil.ReadText(`views/list.html`);
      html = this.replace(html, 'RESULT', JSON.stringify(result.data));
      res.end(html);
    } catch (ex) {
      console.log(ex);
      next(ex);
    }
  }

  private replace(str: string, key: string, to: string | number): string {
    if (to === undefined || to === null) str = str.replace(new RegExp(`\\$\\(${key}\\)\\$`, 'g'), '');
    else if (typeof to === 'string') str = str.replace(new RegExp(`\\$\\(${key}\\)\\$`, 'g'), to);
    else str = str.replace(new RegExp(`\\$\\(${key}\\)\\$`, 'g'), to.toString());

    return str;
  }
}
