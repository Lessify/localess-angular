import {inject, Injectable} from '@angular/core';
import {LOCALESS_SERVER_CONFIG} from "../localess.config";
import type {ContentAsset} from "@localess/js-client";

@Injectable({
  providedIn: 'root'
})
export class ServerAssetService {
  config = inject(LOCALESS_SERVER_CONFIG)

  constructor() {
    console.log('[Localess]ServerAssetService', this.config);
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
