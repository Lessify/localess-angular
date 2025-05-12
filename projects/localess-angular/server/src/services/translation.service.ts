import {isPlatformBrowser} from '@angular/common';
import {HttpClient} from '@angular/common/http';
import {Inject, inject, Injectable, PLATFORM_ID} from '@angular/core';
import {Observable} from 'rxjs';
import {LOCALESS_SERVER_CONFIG} from "../localess.config";
import type {Translations} from "../models";

@Injectable()
export class ServerTranslationService {
  config = inject(LOCALESS_SERVER_CONFIG)

  constructor(
    private readonly httpClient: HttpClient,
    @Inject(PLATFORM_ID) private readonly platformId: Object,
  ) {
    if (this.config.debug) {
      console.log('[Localess] ServerTranslationService', this.config);
    }
    if(isPlatformBrowser(platformId)) {
      console.error('[Localess] ServerTranslationService: Please use the service on server side only.');
    }
  }

  /**
   * Retrieve all Translations by Localess.
   */
  fetch(locale: string): Observable<Translations> {
    let url = `${this.config.origin}/api/v1/spaces/${this.config.spaceId}/translations/${locale}`;
    return this.httpClient.get<Translations>(url, {params: {token: this.config.token}});
  }
}
