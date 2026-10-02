import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NewsService } from '../services/news';
import { Article } from '../interfaces/article';
import { combineLatest, Observable } from 'rxjs'
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
  articlesList$!: Observable<Article[]>;
  category!: Observable<string | null>;
  term$!: Observable<string | null>;

  constructor(private newsService: NewsService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.articlesList$ = this.newsService.getArticles();
    this.category = this.route.paramMap.pipe(
      map(params => params.get('category'))
    );
    this.term$ = this.route.queryParamMap.pipe(
      map(params => params.get('term'))
    );
  }
}