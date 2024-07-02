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

## Client Module

````ts
const LOCALESS_URL = 'https://my-localess.web.app';
const LOCALESS_SPACE = 'I1LoVe2LocaLess4Rever';

export const appConfig: ApplicationConfig = {
  providers: [
    provideLocalessBrowser({
      origin: LOCALESS_URL,
      spaceId: LOCALESS_SPACE,
    })
  ],
};

````

## Server Module

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
