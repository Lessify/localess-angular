import { Injectable, makeStateKey } from '@angular/core';
import {Content, Links} from '@localess/angular';
import { Observable } from 'rxjs';

@Injectable()
export abstract class LocalessService {
  LINKS_KEY = makeStateKey<Links>('ll:links');

  abstract getLinks(): Observable<Links>;

  abstract getContentById(id: string, locale?: string): Observable<Content>;

  abstract getContentBySlug(slug: string | string[], locale?: string): Observable<Content>;
}
