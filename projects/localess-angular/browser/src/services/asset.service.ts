import {Inject, Injectable} from '@angular/core';
import {LOCALESS_BROWSER_CONFIG, LocalessBrowserConfig} from "../localess.config";
import {ContentAsset} from "@localess/js-client";

@Injectable()
export class BrowserAssetService {

  constructor(
      @Inject(LOCALESS_BROWSER_CONFIG) readonly config: LocalessBrowserConfig
  ) {
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
