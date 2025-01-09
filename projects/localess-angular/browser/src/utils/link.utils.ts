import type {ContentLink, Links} from "../models";

export function findLink(links: Links, link: ContentLink): string {
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
