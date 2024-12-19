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
Why do we need Client Provider, the provider is designed to be used on the client side only, as it **API Token** is not requires.

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

### Visual Editor Enable
You can extend `VisualEditorComponent` in your main/app components.
It will help to load all required scripts to enable Visual Editor sync.

````ts
import {VisualEditorComponent} from "@localess/angular/browser";

@Component({
  selector: 'llw-application',
  standalone: true,
  templateUrl: 'application.component.html',
  styleUrl: 'application.component.scss',
  imports: []
})
export default class HeroSectionComponent extends VisualEditorComponent {

}
````

### Client Schema Component
You can extend `SchemaComponent` in your components.

Implement `id()` method to return the id of the component. It will help to identify the component in the Localess VisualEditor UI.

Now you have access to two utilities `assetUrl` and `findLink` to get the asset url and link url respectively.

````ts
import {SchemaComponent} from "@localess/angular/browser";

@Component({
  selector: 'llw-schema-hero-section',
  standalone: true,
  templateUrl: 'hero-section.component.html',
  styleUrl: 'hero-section.component.scss',
  imports: []
})
export default class HeroSectionComponent extends SchemaComponent {

  data = input.required<HeroSection>();
  links = input.required<Links>();

  override id(): string {
    return this.data()._id;
  }
}
````

### Directives
You can use one of next directive `[data-ll-id]` or `[llId]` in case your don't extend `LocalessComponent` or your component has sub-schema, and you still wish to keep Visual Editor selection feature.

### Pipes
#### Asset
Pipe `llAsset`, same feature as `LocalessComponent.assetUrl()` function, on in pipe.
#### Link
Pipe `llLink`, same feature as `LocalessComponent.findLink()` function, on in pipe.
#### RichText to HTML
Pipe `llRtToHtml`, used to transform **RichText** Schema into **HTML**.
#### Safe HTML
Pipe `llSafeHtml`, use to sanitizer **HTML** from **XSS security risks**.

## Server Provider

Why do we need Server Provider, the provider is design to run on server side only, as it requires your **Localess API Token** to be kept secret.

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
