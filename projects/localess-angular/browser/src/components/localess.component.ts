import {Component, inject} from "@angular/core";
import {LOCALESS_BROWSER_CONFIG} from "../localess.config";
import {ContentAsset, ContentLink, Links} from "@localess/js-client";

@Component({
  selector: 'll-component',
  standalone: true,
  template: '',
  host: {
    'data-ll-id': 'id'
  }
})
export abstract class LocalessComponent implements LocalessId {

  config = inject(LOCALESS_BROWSER_CONFIG)

  abstract get id(): string;

  assetUrl(asset: ContentAsset): string {
    return this.config.assetPathPrefix + asset.uri;
  }

  findLink(links: Links, link: ContentLink): string{
    switch (link.type) {
      case "content": {
        const path = links[link.uri]
        if (path) {
          return '/' + path.fullSlug;
        } else {
          return '/not-found';
        }
      }
      case "url":
        return link.uri
      default:
        return 'no-type'
    }
  }
}

export interface LocalessId {
  get id(): string;
}
