import {inject, Injectable} from '@angular/core';
import {LOCALESS_BROWSER_CONFIG} from "../localess.config";
import type {ContentAsset} from "../models";

@Injectable()
export class BrowserAssetService {
  config = inject(LOCALESS_BROWSER_CONFIG)
  constructor() {
    if (this.config.debug) {
      console.log('[Localess] BrowserAssetService', this.config);
    }
  }

  /**
   * Convert Asset to URL.
   * @param asset
   */
  link(asset: ContentAsset | string): string {
    if (typeof asset === 'string') {
      return `${this.config.origin}/api/v1/spaces/${this.config.spaceId}/assets/${asset}`;
    } else {
      return `${this.config.origin}/api/v1/spaces/${this.config.spaceId}/assets/${asset.uri}`;
    }
  }
}
