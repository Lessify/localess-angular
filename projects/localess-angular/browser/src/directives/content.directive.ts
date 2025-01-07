import {Directive, ElementRef, input, OnInit} from "@angular/core";
import type {ContentData} from "@localess/js-client";

@Directive({
  selector: '[data-ll-id]',
  standalone: true
})
export class ContentIdDirective {}

@Directive({
  selector: '[data-ll-schema]',
  standalone: true
})
export class ContentSchemaDirective {}

@Directive({
  selector: '[llContent]',
  standalone: true
})
export class ContentDirective implements OnInit{
  content = input.required<ContentData>({alias: 'llContent'})
  constructor(
    private el: ElementRef
  ) {
  }
  ngOnInit(): void {
    this.el.nativeElement.setAttribute('data-ll-id', this.content()._id);
    this.el.nativeElement.setAttribute('data-ll-schema', this.content().schema);
  }
}

