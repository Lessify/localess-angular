import {Inject, Pipe, PipeTransform} from "@angular/core";
import {ContentAsset} from "@localess/js-client";
import {LOCALESS_BROWSER_CONFIG, LocalessBrowserConfig} from "../localess.config";

@Pipe({
  name: 'llAsset',
  standalone: true
})
export class AssetPipe implements PipeTransform {

  constructor(
    @Inject(LOCALESS_BROWSER_CONFIG) readonly config: LocalessBrowserConfig
  ) {
    console.log('[Localess]AssetPipe', config);
  }

  transform(asset: ContentAsset): string {
    console.log('[Localess]AssetPipe:transform', this.config, asset);
    return `${this.config.origin}/api/v1/spaces/${this.config.spaceId}/assets/${asset.uri}`;
  }
}
