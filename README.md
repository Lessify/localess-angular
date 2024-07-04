<br/>
<br/>
<img src="https://github.com/Lessify/localess/wiki/img/logo-adaptive.svg" alt="logo">
<br/>
<br/>

----

# Localess Angular

This client SDK is designed to work with the Localess API. It provides a simple way to interact with the Localess API from your Angular application.

> **Important:**
> The @localess\angular Library has two modules **client** and **server**.
>
> The **client** module is designed to be used on the client side only, as it **API Token** is not requires.
>
> The **server** module is designed to be used on the server side only, as it requires your **Localess API Token** to be kept secret.

## Installation

### NPM
````bash
npm install @localess/angular@latest
````

### Yarn
````bash
yarn add @localess/angular@latest
````

## Usage

## Client Provider

````ts
const LOCALESS_URL = 'https://my-localess.web.app';
const LOCALESS_SPACE = 'I1LoVe2LocaLess4Rever';

export const appConfig: ApplicationConfig = {
  providers: [
    provideLocalessBrowser({
      origin: LOCALESS_URL,
      spaceId: LOCALESS_SPACE,
    }),
  ],
};
````

## Client Base Component

Create `LocalessComponenet` and extend it in your components.

````ts
import {Component, inject} from "@angular/core";
import {ContentAsset, ContentLink, Links} from "@localess/js-client";
import {findLink, LOCALESS_BROWSER_CONFIG} from "@localess/angular/browser";

@Component({
  selector: 'llw-component',
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
    return findLink(links, link);
  }
}
````

Now you can extend `LocalessComponent` in your components.

Implement `id()` method to return the id of the component. It will help to identify the component in the Localess VisualEditor UI.

Now you have access not to two utilities `assetUrl` and `findLink` to get the asset url and link url respectively.

````ts
@Component({
  selector: 'llw-schema-hero-section',
  standalone: true,
  templateUrl: 'hero-section.component.html',
  styleUrl: 'hero-section.component.scss',
  imports: []
})
export default class HeroSectionComponent extends LocalessComponent {

  data = input.required<HeroSection>();
  links = input.required<Links>();

  override id(): string {
    return this.data()._id;
  }
}
````


## Server Provider

````ts
const LOCALESS_URL = 'https://my-localess.web.app';
const LOCALESS_SPACE = 'I1LoVe2LocaLess4Rever';
const LOCALESS_TOKEN = 'Baz00KaT0KeN8S3CureLL';

const serverConfig: ApplicationConfig = {
  providers: [
    provideLocalessServer({
      origin: LOCALESS_URL,
      spaceId: LOCALESS_SPACE,
      token: LOCALESS_TOKEN
    }),
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
````
