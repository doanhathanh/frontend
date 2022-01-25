import * as dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import WebServer from './WebServer';

//------------------------------------------------------------------
dotenv.config();

//------------------------------------------------------------------
const app = express();

//------------------------------------------------------------------
/**
 *  App Configuration
 */
app.use(helmet());

//------------------------------------------------------------------
/**
 * Server Activation
 */
const WEB_PORT: number = parseInt(process.env.WEB_PORT as string, 10);
const webServer: WebServer = new WebServer();
webServer.start(WEB_PORT);

//------------------------------------------------------------------
/**
 * Webpack HMR Activation
 */
type ModuleId = string | number;

interface WebpackHotModule {
  hot?: {
    // eslint-disable-next-line
    data: any;
    accept(dependencies: string[], callback?: (updatedDependencies: ModuleId[]) => void): void;
    accept(dependency: string, callback?: () => void): void;
    accept(errHandler?: (err: Error) => void): void;
    // eslint-disable-next-line
    dispose(callback: (data: any) => void): void;
  };
}

declare const module: WebpackHotModule;
if (module.hot) {
  module.hot.accept();
  module.hot.dispose(() => {
    webServer?.stop();
  });
}
