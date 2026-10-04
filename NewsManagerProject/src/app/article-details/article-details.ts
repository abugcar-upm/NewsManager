import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { NewsService } from '../services/news';
import { Article } from '../interfaces/article';

@Component({
  imports: [CommonModule],
  selector: 'app-article-details',
  styleUrl: './article-details.css',
  templateUrl: './article-details.html',
})
export class ArticleDetails implements OnInit {
  article: Article | null = null;
  message: string | null = null;

  constructor(private route: ActivatedRoute,
              private location: Location,
              private newsService: NewsService,
              private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    this.newsService.getArticle(id).subscribe({
      next: (res) => {
        this.article = res;
        this.cdr.markForCheck();
      },
      error: (err) => {
        this.article = null;
        this.message = `An error has ocurred: ${err.statusText}`;
        this.cdr.markForCheck();
      },
      complete: () => {
        console.log('Operation finished');
      }
    });
  }

  goBack(): void {
    this.location.back();
  }
}
