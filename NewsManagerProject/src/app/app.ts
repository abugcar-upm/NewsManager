import { Component, signal, inject } from '@angular/core';
import { RouterLink, RouterOutlet, ActivatedRoute, Router, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [RouterOutlet, FormsModule, RouterLink, RouterLinkActive],
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
