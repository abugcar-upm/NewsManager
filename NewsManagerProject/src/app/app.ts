import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLinkWithHref, RouterLinkActive } from '@angular/router';
import { ArticleList } from './article-list/article-list';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [RouterOutlet, ArticleList, FormsModule, RouterLinkWithHref, RouterLinkActive],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('NewsManagerProject');
  term: string = "";
}
