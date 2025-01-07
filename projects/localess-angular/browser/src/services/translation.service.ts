import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LOCALESS_BROWSER_CONFIG} from "../localess.config";
import type {Translations} from "@localess/js-client";

@Injectable({
  providedIn: 'root'
})
export class BrowserTranslationService {
  config = inject(LOCALESS_BROWSER_CONFIG)
  constructor(
      readonly httpClient: HttpClient,
  ) {
    if (this.config.debug) {
      console.log('[Localess]BrowserTranslationService', this.config);
    }
  }

  /**
   * Retrieve all Translations by Localess.
   */
  fetch(locale: string): Observable<Translations> {
    let url = `${this.config.origin}/api/v1/spaces/${this.config.spaceId}/translations/${locale}`;
    return this.httpClient.get<Translations>(url);
  }
}
