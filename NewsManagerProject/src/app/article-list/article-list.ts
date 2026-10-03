import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NewsService } from '../services/news';
import { Article } from '../interfaces/article';
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { RouterLink } from '@angular/router';
import { Ng2SearchPipe } from '../pipes/ng2-search-pipe-pipe';
import { CategoryFilterPipePipe } from '../pipes/category-filter-pipe-pipe';

@Component({
  imports: [FormsModule, CommonModule, RouterLink, Ng2SearchPipe, CategoryFilterPipePipe],
  selector: 'app-article-list',
  styleUrl: './article-list.css',
  templateUrl: './article-list.html',
})
export class ArticleList {
  articlesList = signal<Article[]>([]);
  category = signal<string | null>(null);
  term$!: Observable<string | null>;

  constructor(private newsService: NewsService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.getArticleList();
    this.route.paramMap.subscribe(params => {
      this.category.set(params.get('category'));
    })
    this.term$ = this.route.queryParamMap.pipe(
      map(params => params.get('term'))
    );
  }

  getArticleList(){
    this.newsService.getArticles().subscribe({
      next: (res) => {
        this.articlesList.set(res);
        console.log(`Articles list: `, res);
      },
      error: (err) => {
        console.log(`An error has ocurred: ${err.statusText}`);
      }
    })
  }
}