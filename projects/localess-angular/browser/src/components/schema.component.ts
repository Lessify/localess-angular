import {Component, inject} from "@angular/core";
import {LOCALESS_BROWSER_CONFIG} from "../localess.config";
import type {ContentAsset, ContentLink, Links} from "@localess/js-client";
import {findLink} from "../utils/link.utils";

/**
 * Schema base component
 * @since v0.2.0
 */
@Component({
  selector: 'll-schema-component',
  standalone: true,
  template: '',
  host: {
    '[attr.data-ll-id]': 'id()'
  },
})
export abstract class SchemaComponent {

  config = inject(LOCALESS_BROWSER_CONFIG)

  abstract id(): string;

  assetUrl(asset: ContentAsset): string {
    return this.config.assetPathPrefix + asset.uri;
  }

  findLink(links: Links, link: ContentLink): string {
    return findLink(links, link)
  }
}
