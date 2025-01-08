import {Component, inject} from "@angular/core";
import {LOCALESS_BROWSER_CONFIG} from "../localess.config";
import type {ContentAsset, ContentLink, Links} from "../models";
import {findLink} from "../utils/link.utils";

/**
 * @since 0.1.0
 * @deprecated starting with v0.2.0, it will be removed in future versions.
 * Please use SchemaComponent instead.
 */
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
