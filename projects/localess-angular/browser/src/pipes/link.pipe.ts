import {Inject, Pipe, PipeTransform} from "@angular/core";
import {ContentLink, Links} from "@localess/js-client";
import {LOCALESS_BROWSER_CONFIG, LocalessBrowserConfig} from "../localess.config";

@Pipe({
  name: 'llLink',
  standalone: true
})
export class LinkPipe implements PipeTransform {

  constructor(
    @Inject(LOCALESS_BROWSER_CONFIG) readonly config: LocalessBrowserConfig
  ) {
    console.log('[Localess]LinkPipe', config);
  }

  transform(link: ContentLink, links: Links): string {
    console.log('[Localess]LinkPipe:transform', this.config, link);
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
