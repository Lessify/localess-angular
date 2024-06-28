import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LOCALESS_SERVER_CONFIG, LocalessServerConfig} from "../localess.config";
import {Content, ContentFetchParams, Links} from "@localess/js-client";

@Injectable({
  providedIn: 'root'
})
export class ServerContentService {

  constructor(
      readonly httpClient: HttpClient,
      @Inject(LOCALESS_SERVER_CONFIG) readonly config: LocalessServerConfig
  ) {
  }

  /**
   * Get all links
   * @returns {Observable<Links>}
   */
  getLinks(): Observable<Links> {
    let url = `${this.config.origin}/api/v1/spaces/${this.config.spaceId}/links`;
    return this.httpClient.get<Links>(url, {params: {token: this.config.token}});
  }

  /**
   * Get content by SLUG
   * @param slug{string} - Content SLUG
   * @param params{ContentFetchParams} - Fetch parameters
   * @returns {Observable<Content>}
   */
  getContentBySlug(slug: string, params?: ContentFetchParams): Observable<Content> {
    let url = `${this.config.origin}/api/v1/spaces/${this.config.spaceId}/contents/slugs/${slug}`;
    let version = '';
    if (this.config.version && this.config.version == 'draft') {
      version = `&version=${this.config.version}`;
    }
    if (params?.version && params.version == 'draft') {
      version = `&version=${params.version}`;
    }
    return this.httpClient.get<Content>(url, {
      params: {
        token: this.config.token,
        version,
        locale: params?.locale || ''
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
    let version = '';
    if (this.config.version && this.config.version == 'draft') {
      version = `&version=${this.config.version}`;
    }
    if (params?.version && params.version == 'draft') {
      version = `&version=${params.version}`;
    }
    return this.httpClient.get<Content>(url, {
      params: {
        token: this.config.token,
        version,
        locale: params?.locale || ''
      }
    });
  }
}
