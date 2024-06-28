import {InjectionToken} from "@angular/core";

export type LocalessBrowserConfig = {
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

export const LOCALESS_BROWSER_CONFIG = new InjectionToken<LocalessBrowserConfig>(
  'LOCALESS_BROWSER_CONFIG',
  {
    providedIn: 'root',
    factory: () => defaultBrowserConfig
  }
);

export const defaultBrowserConfig: LocalessBrowserConfig = {
  origin: '',
  spaceId: '',
};
