import {Pipe, PipeTransform} from "@angular/core";
import {toHtml} from 'hast-util-to-html';
import type {Nodes, RootContent} from "hast";

@Pipe({
  name: "llRtToHtml",
  standalone: true,
})
export class RichTextToHtmlPipe implements PipeTransform {
  transform(value: Array<RootContent> | Nodes | any): string {
    return toHtml(value);
  }
}
