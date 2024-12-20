import {Inject, Injectable} from '@angular/core';
import {LOCALESS_SERVER_CONFIG, LocalessServerConfig} from "../localess.config";
import {ContentAsset} from "@localess/js-client";

@Injectable({
  providedIn: 'root'
})
export class ServerAssetService {

  constructor(
    @Inject(LOCALESS_SERVER_CONFIG) private readonly config: LocalessServerConfig
  ) {
    console.log('[Localess]ServerAssetService', config);
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
