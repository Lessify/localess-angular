import {EnvironmentProviders, makeEnvironmentProviders} from "@angular/core";
import {LOCALESS_SERVER_CONFIG} from "./localess.config";

export type LocalessServerOptions = {
  /**
   * A fully qualified domain name with protocol (http/https) and port.
   *
   * Example: https://my-localess.web.app
   */
  origin: string;
  /**
   * Localess space ID, cna be found in the Localess Space settings
   */
  spaceId: string;
  /**
   * Localess API token, can be found in the Localess Space settings
   */
  token: string;
  /**
   * Content version to fetch, leave empty for 'published' or 'draft' for the latest draft
   */
  version?: 'draft' | string;
  /**
   * Enable debug mode
   */
  debug?: boolean;
};

export function provideLocalessServer(options: LocalessServerOptions): EnvironmentProviders[] {
  if (options.origin) {
    throw new Error('Localess Origin can\'t be empty');
  }
  if (options.spaceId) {
    throw new Error('Localess Space ID can\'t be empty');
  }
  if (options.token) {
    throw new Error('Localess Token can\'t be empty');
  }
  console.log('[Localess] provideLocalessServer', options);
  const providers: EnvironmentProviders[] = [
    makeEnvironmentProviders([
      {
        provide: LOCALESS_SERVER_CONFIG,
        useValue: options,
      },
    ])
  ];
  console.log('[Localess] provideLocalessServer', providers);
  return providers;
}
