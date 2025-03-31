import {Component, inject, Input, input} from "@angular/core";
import {LOCALESS_BROWSER_CONFIG} from "../localess.config";
import type {ContentDataSchema, ContentAsset, ContentLink, Links} from "../models";
import {findLink} from "../utils/link.utils";

/**
 * Schema base component
 * @since v0.5.1
 */
@Component({
  selector: 'll-schema-with-input-component',
  standalone: true,
  template: '',
  host: {
    '[attr.data-ll-id]': 'data()._id',
    '[attr.data-ll-schema]': 'data()._schema || data().schema'
  },
})
export abstract class SchemaWithInputComponent<T extends ContentDataSchema = ContentDataSchema> {

  config = inject(LOCALESS_BROWSER_CONFIG)

  @Input({required: true})
  data!: T;
  @Input({required: false})
  links: Links | undefined;

  assetUrl(asset: ContentAsset): string {
    return this.config.assetPathPrefix + asset.uri;
  }

  findLink(link: ContentLink): string {
    const links = this.links
    if (links) {
      return findLink(links, link)
    }
    return '/not-found';
  }
}
