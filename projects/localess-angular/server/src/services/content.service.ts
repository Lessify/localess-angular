import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LOCALESS_SERVER_CONFIG} from "../localess.config";
import type {Content, ContentFetchParams, Links, LinksFetchParams} from "@localess/js-client";

interface ClientParams {
  [param: string]: string | boolean
}

@Injectable({
  providedIn: 'root'
})
export class ServerContentService {
  config = inject(LOCALESS_SERVER_CONFIG)

  constructor(
    readonly httpClient: HttpClient,
  ) {
    console.log('[Localess]ServerContentService', this.config);
  }

  /**
   * Get all links
   * @returns {Observable<Links>}
   */
  getLinks(params?: LinksFetchParams): Observable<Links> {
    let url = `${this.config.origin}/api/v1/spaces/${this.config.spaceId}/links`;
    const clientParams: ClientParams = {}
    if (params?.kind) {
      clientParams['kind'] = params.kind;
    }
    if (params?.parentSlug) {
      clientParams['parentSlug'] = params.parentSlug;
    }
    if (params?.excludeChildren) {
      clientParams['excludeChildren'] = params.excludeChildren;
    }
    return this.httpClient.get<Links>(url, {
      params: {
        token: this.config.token,
        ...clientParams
      }
    });
  }

  /**
   * Get content by SLUG
   * @param slug{string} - Content SLUG
   * @param params{ContentFetchParams} - Fetch parameters
   * @returns {Observable<Content>}
   */
  getContentBySlug(slug: string, params?: ContentFetchParams): Observable<Content> {
    let url = `${this.config.origin}/api/v1/spaces/${this.config.spaceId}/contents/slugs/${slug}`;
    const clientParams: ClientParams = {}
    // Config
    if (this.config.version && this.config.version == 'draft') {
      clientParams['version'] = this.config.version;
    }
    // Params
    if (params?.version && params.version == 'draft') {
      clientParams['version'] = params.version;
    }
    if (params?.locale) {
      clientParams['locale'] = params.locale;
    }
    return this.httpClient.get<Content>(url, {
      params: {
        token: this.config.token,
        ...clientParams,
      }
    });
  }

  /**
   * Get content by ID
   * @param id{string} - Content ID
   * @param params{ContentFetchParams} - Fetch parameters
   * @returns {Observable<Content>}
   */
  getContentById(id: string, params?: ContentFetchParams): Observable<Content> {
    let url = `${this.config.origin}/api/v1/spaces/${this.config.spaceId}/contents/${id}`;
    const clientParams: ClientParams = {}
    // Config
    if (this.config.version && this.config.version == 'draft') {
      clientParams['version'] = this.config.version;
    }
    // Params
    if (params?.version && params.version == 'draft') {
      clientParams['version'] = params.version;
    }
    if (params?.locale) {
      clientParams['locale'] = params.locale;
    }
    return this.httpClient.get<Content>(url, {
      params: {
        token: this.config.token,
        ...clientParams
      }
    });
  }
}
