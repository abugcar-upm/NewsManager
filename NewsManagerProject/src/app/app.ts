import { Component, signal, OnInit, inject } from '@angular/core';
import {HttpParams} from "@angular/common/http";
import { RouterLink, RouterOutlet, ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [RouterOutlet, FormsModule, RouterLink],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('NewsManagerProject');

  private router = inject(Router);
  private route = inject(ActivatedRoute);

  term!: string;

  ngOnInit() {
    this.term = '';
  }

  termChange(newTerm: string) {
    this.term = newTerm;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        term: this.term || null,
      },
      queryParamsHandling: 'merge',
      replaceUrl: true,
    });
  }
}
