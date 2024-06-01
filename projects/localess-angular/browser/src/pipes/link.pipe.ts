import {Pipe, PipeTransform} from "@angular/core";
import {ContentLink, Links} from "@localess/js-client";

@Pipe({
  name: 'llLink',
  standalone: true
})
export class LinkPipe implements PipeTransform {

  transform(link: ContentLink, links: Links): string {
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
