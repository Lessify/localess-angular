import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { provideServerRouting } from '@angular/ssr';
import {provideLocalessServer} from '@localess/angular/server';
import { appConfig } from './app.config';
import { serverRoutes } from './app.routes.server';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    provideServerRouting(serverRoutes),
    provideLocalessServer({
      origin: "https://demo.localess.org", // Replace it for your origin
      spaceId: "MmaT4DL0kJ6nXIILUcQF", // Replace it for your spaceId
      version: "draft",
      token: "Y4rvboPnyzVeC7LddEK5", // Replace it for your token
      debug: true,
    })
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
