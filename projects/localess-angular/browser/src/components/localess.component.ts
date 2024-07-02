import {Component, inject} from "@angular/core";
import {LOCALESS_BROWSER_CONFIG} from "../localess.config";
import {ContentAsset, ContentLink, Links} from "@localess/js-client";
import {findLink} from "../utils/link.utils";

@Component({
  selector: 'll-component',
  standalone: true,
  template: '',
  host: {
    '[attr.data-ll-id]': 'id()'
  },
})
export abstract class LocalessComponent {

  config = inject(LOCALESS_BROWSER_CONFIG)

  abstract id(): string;

  assetUrl(asset: ContentAsset): string {
    return this.config.assetPathPrefix + asset.uri;
  }

  findLink(links: Links, link: ContentLink): string {
    return findLink(links, link)
  }
}
