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
You can use one of the next directive `[data-ll-id]` or `[llId]` in case you don't extend `SchemaComponent` or your component has a sub-schema, and you still wish to keep the Visual Editor selection feature.

### Pipes
#### Asset
Pipe `llAsset`, the same feature as `LocalessComponent.assetUrl()` function, on in pipe.
#### Link
Pipe `llLink`, the same feature as `LocalessComponent.findLink()` function, on in pipe.
#### RichText to HTML
Pipe `llRtToHtml`, the used to transform **RichText** Schema into **HTML**.
#### Safe HTML
Pipe `llSafeHtml`, used to sanitizer **HTML** from **XSS security risks**.


### Visual Editor Enable
You can extend `VisualEditorComponent` in your main/app components.
It will help to load all required scripts to enable Visual Editor sync.

````ts
import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {BrowserVisualEditorService} from "@localess/angular/browser";

@Component({
  selector: 'll-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <router-outlet></router-outlet> `,
})
export class AppComponent implements OnInit {
  constructor(
    private readonly visualEditorService: BrowserVisualEditorService
  ) {
  }

  ngOnInit(): void {
    this.visualEditorService.init()
  }
}
````

### Listen for Visual Editor Events
Your application can subscribe to the Localess Visual Editor Events :
````ts
@Component({
  selector: 'll-slug',
  standalone: true,
  templateUrl: 'slug.component.html',
  styleUrl: 'slug.component.scss',
})
export default class SlugComponent implements OnInit {
  platformId = inject(PLATFORM_ID)
  editorData = signal<any | undefined>(undefined);

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // check if you are in Framework Edit Mode
      const isDraftMode = true;
      if (isDraftMode && window.localess) {
        window.localess.on(['input', 'change'], (event) => {
          if (event.type === 'input' || event.type === 'change') {
            this.editorData.set(event.data);
          }
        });
      }
    }
  }
}
````

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
