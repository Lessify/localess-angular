import { Inject, Injectable, makeStateKey, PLATFORM_ID, TransferState } from '@angular/core';
import {Content, Links} from '@localess/angular';
import { Observable, of } from 'rxjs';
import {LocalessService} from './localess.service';

@Injectable()
export class LocalessBrowserService extends LocalessService {
  constructor(
    @Inject(PLATFORM_ID) private readonly platformId: unknown,
    private state: TransferState,
  ) {
    super();
  }

  fetchLinks(): Observable<Links> {
    console.log('fetchLinks', this.platformId);
    return of(this.state.get(this.LINKS_KEY, {}));
  }

  fetchContentById(id: string, locale?: string): Observable<Content> {
    console.log('fetchDocumentById', id, this.platformId);
    const key = makeStateKey<Content>(`ll:content:id:${id}`);
    if (this.state.hasKey(key)) {
      return of(
        this.state.get(key, {
          id: '',
          kind: 'DOCUMENT',
          slug: '',
          fullSlug: '',
          parentSlug: '',
          name: '',
          createdAt: '',
          updatedAt: '',
          publishedAt: '',
        }),
      );
    }
    return of();
  }

  fetchContentBySlug(slug: string | string[], locale?: string): Observable<Content> {
    let normalizedSlug: string;
    if (Array.isArray(slug)) {
      normalizedSlug = slug.join('/');
    } else {
      normalizedSlug = slug;
    }
    console.log('fetchDocumentBySlug', normalizedSlug, this.platformId);
    const key = makeStateKey<Content>(`ll:content:slug:${normalizedSlug}`);
    if (this.state.hasKey(key)) {
      return of(
        this.state.get(key, {
          id: '',
          kind: 'DOCUMENT',
          slug: '',
          fullSlug: '',
          parentSlug: '',
          name: '',
          createdAt: '',
          updatedAt: '',
          publishedAt: '',
        }),
      );
    }
    return of();
  }
}
