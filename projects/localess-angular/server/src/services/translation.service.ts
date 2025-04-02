import {HttpClient} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {LOCALESS_SERVER_CONFIG} from "../localess.config";
import type {Translations} from "../models";

@Injectable({
  providedIn: 'root'
})
export class ServerTranslationService {
  config = inject(LOCALESS_SERVER_CONFIG)

  constructor(
    readonly httpClient: HttpClient,
  ) {
    console.log('[Localess]ServerTranslationService', this.config);
  }

  /**
   * Retrieve all Translations by Localess.
   */
  fetch(locale: string): Observable<Translations> {
    let url = `${this.config.origin}/api/v1/spaces/${this.config.spaceId}/translations/${locale}`;
    return this.httpClient.get<Translations>(url, {params: {token: this.config.token}});
  }
}
