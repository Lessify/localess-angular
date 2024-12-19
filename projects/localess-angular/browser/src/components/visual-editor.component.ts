import {Component, inject, OnInit, PLATFORM_ID} from "@angular/core";
import {LOCALESS_BROWSER_CONFIG} from "../localess.config";
import {isPlatformBrowser} from "@angular/common";

/**
 * Visual Editor Script Enabler
 * @since v0.2.0
 */
@Component({
  selector: 'll-visual-editor-component',
  standalone: true,
  template: '',
})
export abstract class VisualEditorComponent implements OnInit {

  config = inject(LOCALESS_BROWSER_CONFIG)
  platformId = inject(PLATFORM_ID)

  ngOnInit(): void {
    if (this.config.debug) {
      console.debug(`VisualEditorComponent:ngOnInit:${this.platformId}`);
    }
    if (isPlatformBrowser(this.platformId)) {
      console.debug(`VisualEditorComponent:load`);
      //loadLocalessSync(this.config.origin)
    }
  }
}
