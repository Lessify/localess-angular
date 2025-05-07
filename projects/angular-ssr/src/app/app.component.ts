import {JsonPipe} from '@angular/common';
import {Component, inject, OnInit, signal} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ServerContentService, type Links} from '@localess/angular/server';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, JsonPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'angular-ssr';
  serverContentService = inject(ServerContentService)
  links = signal<Links | undefined>(undefined)

  ngOnInit(): void {
    this.serverContentService.getLinks().subscribe({
      next: value => this.links.set(value)
    })
  }
}
