import {Component, inject, OnInit, PLATFORM_ID} from "@angular/core";
import {LOCALESS_BROWSER_CONFIG} from "../localess.config";
import {loadLocalessSync} from "@localess/js-client";
import {isPlatformBrowser} from "@angular/common";

/**
 * Visual Editor Script Enabler
 * @since v0.2.0
 */
@Component({
  selector: 'll-component',
  standalone: true,
  template: '',
})
export abstract class VisualEditorComponent implements OnInit {

  config = inject(LOCALESS_BROWSER_CONFIG)
  platformId = inject(PLATFORM_ID)

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      loadLocalessSync(this.config.origin)
    }
  }
}
