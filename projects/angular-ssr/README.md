# angular-ssr — Localess Angular Demo Application

This project is the reference implementation and development testbed for the `@localess/angular` library. It demonstrates a complete Angular SSR application that fetches content from a live Localess space, renders it server-side, and hydrates on the client using Angular's `TransferState`.

## What it demonstrates

- **Full SSR setup** — `provideLocalessBrowser()` in the browser config and `provideLocalessServer()` in the server config, merged with `mergeApplicationConfig()`
- **TransferState pattern** — an abstract `LocalessService` with separate `LocalessBrowserService` and `LocalessServerService` implementations that transfer server-fetched data to the browser without a second network request
- **Wildcard routing** — all routes (`**`) resolve to `SlugComponent`, which receives the content document via an Angular route resolver
- **Draft / published toggle** — the server config uses `version: 'draft'` to preview unpublished content
- **Locale support** — locale is passed as a query parameter (`?locale=en`) and forwarded to the content fetch

## Running the demo

```bash
# Serve with server-side rendering
npm run serve:ssr:angular-ssr

# Serve browser-only (no SSR)
npm run start
```

The demo connects to `https://demo.localess.org` with Space ID `MmaT4DL0kJ6nXIILUcQF`. Replace the `origin`, `spaceId`, and `token` values in `app.config.ts` and `app.config.server.ts` to point at your own Localess instance.

## Project structure

```
src/app/
├── app.config.ts               Browser ApplicationConfig (provideLocalessBrowser)
├── app.config.server.ts        Server ApplicationConfig (provideLocalessServer)
├── app.routes.ts               Wildcard route with content resolver
├── app.routes.server.ts        Server routes (Prerender mode)
├── slug/
│   └── slug.component.ts       Main page component — renders resolved content
└── shared/
    ├── services/
    │   ├── localess.service.ts         Abstract service interface
    │   ├── localess-browser.service.ts Reads content from TransferState
    │   └── localess-server.service.ts  Fetches from API and writes to TransferState
    └── utils/
        └── locales.ts                  Supported locale definitions
```

## Key files

| File | Purpose |
|---|---|
| `app.config.ts` | Registers `provideLocalessBrowser()`, `provideHttpClient(withFetch())`, `provideClientHydration()`, and `LocalessBrowserService` |
| `app.config.server.ts` | Registers `provideLocalessServer()` and `LocalessServerService`; merged with `appConfig` |
| `shared/services/localess-server.service.ts` | Calls `ServerContentService`, then stores results in `TransferState` via `tap()` |
| `shared/services/localess-browser.service.ts` | Returns content from `TransferState` using `of()` — no extra HTTP requests |

## Related

- **Library source:** `projects/localess-angular/`
- **Library documentation:** [`../../README.md`](../../README.md)
- **Localess CMS:** https://github.com/Lessify/localess
