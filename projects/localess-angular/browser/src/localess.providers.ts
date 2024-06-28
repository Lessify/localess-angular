import {EnvironmentProviders, makeEnvironmentProviders} from "@angular/core";
import {LOCALESS_BROWSER_CONFIG} from "./localess.config";

export type LocalessBrowserOptions = {
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
   * Enable debug mode
   */
  debug?: boolean;
};

export function provideLocalessBrowser(options: LocalessBrowserOptions): EnvironmentProviders[] {
  if (options.origin) {
    throw new Error('Localess Origin can\'t be empty');
  }
  if (options.spaceId) {
    throw new Error('Localess Space ID can\'t be empty');
  }
  console.log('[Localess] provideLocalessBrowser', options);
  const providers: EnvironmentProviders[] = [
    makeEnvironmentProviders([
      {
        provide: LOCALESS_BROWSER_CONFIG,
        useValue: options,
      },
    ])
  ];
  console.log('[Localess] provideLocalessBrowser', providers);
  return providers;
}
