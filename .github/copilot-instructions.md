# Copilot Instructions

## Project Overview

`@localess/angular` is an Angular SDK for integrating the [Localess](https://localess.io) headless CMS. It is published as an npm library with two independent entry points:

- `@localess/angular/browser` — client-side content rendering, no API token required
- `@localess/angular/server` — SSR content fetching, requires an API token

## Commands

```bash
# Build
npm run build                  # Build all projects
npm run build:localess         # Build the library only (ng-packagr → dist/localess-angular)

# Test (Karma + Jasmine)
npm run test                                                          # Run all tests
ng test localess-angular                                              # Library tests only
ng test localess-angular --include="**/asset.pipe.spec.ts"           # Single spec file

# Dev app
npm run start                  # Serve browser-only demo app
npm run serve:ssr:angular-ssr  # Serve demo with SSR
```

No lint configuration is present in this repository.

## Architecture

This is an Angular CLI **workspace monorepo** with two projects:

| Project | Path | Purpose |
|---|---|---|
| `localess-angular` | `projects/localess-angular/` | The published library |
| `angular-ssr` | `projects/angular-ssr/` | Demo/reference SSR application |

### Library entry points

The library is built with **ng-packagr** and exposes three entry points:

```
projects/localess-angular/
├── src/           → @localess/angular        (type re-exports from @localess/client only)
├── browser/src/   → @localess/angular/browser
└── server/src/    → @localess/angular/server
```

Each entry point has its own `public-api.ts` that defines the public surface. **Only export from `public-api.ts`** — don't add exports directly to `index.ts`. The root `src/public-api.ts` intentionally contains no Angular symbols — it only re-exports types from `@localess/client`.

### Browser module (`browser/src/`)

Provides UI primitives for rendering CMS content client-side:
- **Abstract base components** (`SchemaComponent`, `SchemaWithInputComponent`, `SchemaWithSignalComponent`) — consumers extend these to render custom schema types
- **Directives** — add `data-ll-id`, `data-ll-schema`, `data-ll-field` attributes for Visual Editor integration
- **Pipes** — `llAsset`, `llLink`, `llRtToHtml`, `llSafeHtml`
- **Provider** — `provideLocalessBrowser({ origin, spaceId, enableSync? })`

`provideLocalessBrowser()` does three things beyond DI registration: validates that `origin` and `spaceId` are non-empty (throws at startup otherwise), optionally injects the Visual Editor sync script, and **registers Angular's built-in `IMAGE_LOADER`** to append `?w=<width>` to Localess asset URLs automatically when `NgOptimizedImage` is used.

The `assetPathPrefix` config field is **computed** inside `provideLocalessBrowser()` as `${origin}/api/v1/spaces/${spaceId}/assets/` — it is not a user-facing option.

### Server module (`server/src/`)

Provides SSR-safe services that call the Localess API using an API token:
- `ServerContentService` — fetches content by slug or ID with a 3-level in-memory cache (slug → ID → links)
- `ServerAssetService`, `ServerTranslationService`
- **Provider** — `provideLocalessServer({ origin, spaceId, token })`

## Key Conventions

### Standalone-only

All components, directives, and pipes use `standalone: true`. There are no NgModules. Use `makeEnvironmentProviders()` for all provider functions.

### `ll` prefix

All public Angular symbols use the `ll` (Localess) prefix:
- Pipe transforms: `llAsset`, `llLink`, `llRtToHtml`, `llSafeHtml`
- Directive selectors: `[data-ll-id]`, `[data-ll-schema]`, `[data-ll-field]`, `[llContent]`

### Configuration injection pattern

Each module has a typed config interface, an `InjectionToken`, and a `provide*()` factory:

```typescript
// Pattern used in both browser and server modules
export const LOCALESS_BROWSER_CONFIG = new InjectionToken<LocalessBrowserConfig>('...');
export function provideLocalessBrowser(config: LocalessBrowserConfig): EnvironmentProviders { ... }
```

### SSR platform guards

Services that behave differently in browser vs. server **must** guard with `isPlatformBrowser` / `isPlatformServer`. Inject `PLATFORM_ID` via `inject(PLATFORM_ID)`.

### Signal-based inputs

New components should prefer signal inputs (`input()`) over `@Input()`. The library ships three abstract base classes to support both patterns:
- `SchemaComponent` — no data input (reads via `content()` method)
- `SchemaWithInputComponent` — traditional `@Input() data`
- `SchemaWithSignalComponent` — signal `input()` data

### Caching in server services

`ServerContentService` uses plain `Map` objects for caching (three separate maps: by slug, by ID, by links params). Cache keys are composite strings built from the relevant params — e.g. `slug=home&version=draft&locale=en`. Do not introduce external caching libraries.

### TransferState pattern for SSR hydration

The canonical pattern for consuming this library in an SSR app (as used in the demo app) is:

1. Define an **abstract `LocalessService`** with `getContentBySlug`, `getContentById`, and `getLinks` methods.
2. Implement **`LocalessServerService`** — calls `ServerContentService` and stores results in `TransferState` via `tap()`.
3. Implement **`LocalessBrowserService`** — returns values from `TransferState` via `of()` (no HTTP).
4. Provide the correct implementation per platform in `app.config.ts` (browser) and `app.config.server.ts` (server).

This keeps all components platform-agnostic — they inject the abstract service and never reference `ServerContentService` directly.

### JSDoc

Public API members should have JSDoc comments with a `@since vX.Y.Z` tag indicating the version they were introduced.

### Peer dependencies

The library targets Angular `^19.0.0 || ^20.0.0 || ^21.0.0`. Avoid using APIs unavailable in Angular 19.

## Dependencies

| Package | Role |
|---|---|
| `@localess/client` | Base Localess client types and utilities |
| `@tiptap/*` | Rich text (used in `llRtToHtml` pipe) |
| `@angular/ssr` + `@angular/platform-server` | SSR support |
