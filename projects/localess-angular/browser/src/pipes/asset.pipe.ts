import {Inject, Optional, Pipe, PipeTransform} from "@angular/core";
import {ContentAsset} from "@localess/js-client";
import {LOCALESS_BROWSER_CONFIG, LocalessBrowserConfig} from "../localess.config";

@Pipe({
  name: 'llAsset',
  standalone: true
})
export class AssetPipe implements PipeTransform {

  constructor(
    @Inject(LOCALESS_BROWSER_CONFIG)
    @Optional()
    private readonly config?: LocalessBrowserConfig | null
  ) {
  }

  transform(asset: ContentAsset): string {
    if (this.config) {
      return `${this.config.origin}/api/v1/spaces/${this.config.spaceId}/assets/${asset.uri}`;
    }
    return '';
  }
}
