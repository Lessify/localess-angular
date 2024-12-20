import {inject, Injectable, PLATFORM_ID} from '@angular/core';
import {LOCALESS_BROWSER_CONFIG} from "../localess.config";
import {isPlatformBrowser} from "@angular/common";

const JS_SYNC_ID = 'localess-js-sync';

/**
 * @since v0.2.2
 */
@Injectable({
  providedIn: 'root'
})
export class BrowserVisualEditorService {
  config = inject(LOCALESS_BROWSER_CONFIG)
  platformId = inject(PLATFORM_ID)

  constructor() {
    if (this.config.debug) {
      console.log('[Localess]BrowserVisualEditorService');
    }
  }

  /**
   * Initiate Sync Script Load
   */
  init() {
    if (this.config.debug) {
      console.log(`[Localess]BrowserVisualEditorService init():${this.platformId}`);
    }
    if (isPlatformBrowser(this.platformId)) {
      if (window.top === window.self) return; // Skip if the page is not loaded in Visual Editor
      const isSyncLoaded = typeof window.localess !== 'undefined';
      if (isSyncLoaded) return; // Skip if Sync is already loaded
      const scriptEl = document.getElementById(JS_SYNC_ID);
      if (scriptEl) return; // Skip if script is already loaded
      const script = document.createElement('script');
      script.id = JS_SYNC_ID;
      script.type = 'text/javascript';
      script.src = `${this.config.origin}/scripts/sync-v1.js`
      script.async = true;
      script.onerror = (error) => console.error(error);
      script.onload = (event) => console.info('Localess Sync Script loaded');
      document.head.appendChild(script);
    }
  }
}
