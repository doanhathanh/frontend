import * as bodyParser from 'body-parser';
import * as viewcontrollers from './viewcontrollers';
import * as http from 'http';
import { Server } from '@overnightjs/core';
import Log from './utils/Log';
import { Request, Response, NextFunction } from 'express';
import { errorHandler } from './middleware/error.middleware';
import { notFoundHandler } from './middleware/notFound.middleware';
import 'reflect-metadata';
import Container from 'typedi';

class WebServer extends Server {
  private className = 'WebServer';
  private appserver: http.Server;

  constructor() {
    super(true);
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.all('/*', this.setupCORS);
  }

  private async initServer(): Promise<void> {
    this.setupControllers();

    this.app.use(errorHandler);
    this.app.use(notFoundHandler);
  }

  private setupControllers(): void {
    const ctlrInstances = [];
    for (const name in viewcontrollers) {
      if (Object.prototype.hasOwnProperty.call(viewcontrollers, name)) {
        // eslint-disable-next-line
        const controller = Container.get((viewcontrollers as any)[name]);
        ctlrInstances.push(controller);
      }
    }

    super.addControllers(ctlrInstances);
  }

  public async start(port: number): Promise<void> {
    const funcName = 'start';

    try {
      await this.initServer();

      this.appserver = this.app.listen(port, () => {
        Log.info(this.className, funcName, `WebServer started on port: ${port}`);
      });

      this.appserver.setTimeout(parseInt(<string>process.env.SERVER_TIMEOUT, 10));
    } catch (ex) {
      Log.info(this.className, funcName, ex);
    }
  }

  public stop(): void {
    this.appserver.close();
  }

  private setupCORS(req: Request, res: Response, next: NextFunction): void {
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Credentials', 'true');

    res.header('Access-Control-Allow-Headers', `Origin, X-Requested-With, Content-type, Accept, X-Access-Token, X-Key, Authorization`);

    const allowOrigins: string[] = (<string>process.env.ALLOW_ORIGIN).split(',');
    let origin = '';
    const headersOrigin = req.headers.origin ? <string>req.headers.origin : '';

    if (allowOrigins.length === 1 && allowOrigins[0] === '*') origin = headersOrigin;
    else if (allowOrigins.indexOf(headersOrigin.toLowerCase()) > -1) origin = headersOrigin;
    else origin = allowOrigins[0];

    res.header('Access-Control-Allow-Origin', origin);

    if (req.method === 'OPTIONS') {
      res.status(200).end();
    } else {
      next();
    }
  }
}

export default WebServer;
