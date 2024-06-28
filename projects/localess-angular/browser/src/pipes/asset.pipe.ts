import {Pipe, PipeTransform} from "@angular/core";
import {ContentAsset} from "@localess/js-client";
import {BrowserAssetService} from "../services/asset.service";

@Pipe({
  name: 'llAsset',
  standalone: true
})
export class AssetPipe implements PipeTransform {

  constructor(
    private readonly assetService: BrowserAssetService
  ) {
  }

  transform(asset: ContentAsset): string {
//      return `${this.config.origin}/api/v1/spaces/${this.config.spaceId}/assets/${asset.uri}`;
    return this.assetService.link(asset);
  }
}
