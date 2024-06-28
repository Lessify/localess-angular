import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LOCALESS_SERVER_CONFIG, LocalessServerConfig} from "../localess.config";
import {Translations} from "@localess/js-client";

@Injectable({
  providedIn: 'root'
})
export class ServerTranslationService {

  constructor(
    readonly httpClient: HttpClient,
    @Inject(LOCALESS_SERVER_CONFIG) readonly config: LocalessServerConfig
  ) {
    console.log('[Localess]ServerTranslationService', config);
  }

  /**
   * Retrieve all Translations by Localess.
   */
  fetch(locale: string): Observable<Translations> {
    let url = `${this.config.origin}/api/v1/spaces/${this.config.spaceId}/translations/${locale}`;
    return this.httpClient.get<Translations>(url);
  }
}
