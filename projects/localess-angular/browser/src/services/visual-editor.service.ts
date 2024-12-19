import {Inject, Injectable} from '@angular/core';
import {LOCALESS_BROWSER_CONFIG, LocalessBrowserConfig} from "../localess.config";

/**
 * @since v0.2.2
 */
@Injectable({
  providedIn: 'root'
})
export class BrowserVisualEditorService {
  constructor(
      @Inject(LOCALESS_BROWSER_CONFIG) readonly config: LocalessBrowserConfig
  ) {
    console.log('[Localess]BrowserVisualEditorService', config);
  }

  /**
   * Initiate Sync Script Load
   */
  init() {
    console.log('[Localess]BrowserVisualEditorService init()');
  }
}
