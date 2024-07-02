import {EnvironmentProviders, makeEnvironmentProviders} from "@angular/core";
import {LOCALESS_BROWSER_CONFIG} from "./localess.config";
import {IMAGE_LOADER, ImageLoaderConfig} from "@angular/common";

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
  if (options.origin === undefined || options.origin === '') {
    throw new Error('Localess Origin can\'t be empty');
  }
  if (options.spaceId === undefined || options.spaceId === '') {
    throw new Error('Localess Space ID can\'t be empty');
  }
  const providers: EnvironmentProviders[] = [
    makeEnvironmentProviders([
      {
        provide: LOCALESS_BROWSER_CONFIG,
        useValue: {
          ...options,
          assetPathPrefix: `${options.origin}/api/v1/spaces/${options.spaceId}/assets/`,
        },
      },
      {
        provide: IMAGE_LOADER,
        useValue: (config: ImageLoaderConfig) => {
          if (options.debug) {
            console.log('[Localess]ImageLoader', config)
          }
          // optimize image for API assets
          if (config.src.startsWith(`${options.origin}/api/v1/spaces/${options.spaceId}/assets/`) && config.width) {
            if (options.debug) {
              console.log('[Localess]ImageLoader match:true')
            }
            return `${config.src}?w=${config.width}`;
          } else {
            if (options.debug) {
              console.log('[Localess]ImageLoader match:false')
            }
            return config.src;
          }
        },
      },
    ])
  ];
  return providers;
}
