import {Component} from "@angular/core";
import {LocalessBrowserConfig} from "../localess.config";
import {ContentAsset, ContentLink, Links} from "@localess/js-client";

@Component({
  selector: 'll-component',
  standalone: true,
  template: '',
  // host: {
  //   '[attr.data-ll-id]': 'id()'
  // },
})
export abstract class LocalessComponent {

  abstract config(): LocalessBrowserConfig;

  abstract id(): string;

  assetUrl(asset: ContentAsset): string {
    return this.config().assetPathPrefix + asset.uri;
  }

  findLink(links: Links, link: ContentLink): string {
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
