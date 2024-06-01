import {Directive, ElementRef, input, OnInit} from "@angular/core";

@Directive({
  selector: '[data-ll-id]',
  standalone: true
})
export class ContentDirective {}

@Directive({
  selector: '[llId]',
  standalone: true
})
export class ContentIdDirective implements OnInit{
  id = input.required<string>({alias: 'llId'})
  constructor(
    private el: ElementRef) {
  }
  ngOnInit(): void {
    this.el.nativeElement.setAttribute('data-ll-id', this.id());
  }
}

