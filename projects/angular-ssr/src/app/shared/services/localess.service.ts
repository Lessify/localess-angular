import { Injectable, makeStateKey } from '@angular/core';
import {Content, Links} from '@localess/angular';
import { Observable } from 'rxjs';

@Injectable()
export abstract class LocalessService {
  LINKS_KEY = makeStateKey<Links>('ll:links');

  abstract fetchLinks(): Observable<Links>;

  abstract fetchContentById(id: string, locale?: string): Observable<Content>;

  abstract fetchContentBySlug(slug: string | string[], locale?: string): Observable<Content>;
}
