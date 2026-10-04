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
  message: string | null = null;

  constructor(private newsService: NewsService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.message = null;
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
        console.log("Articles list: ", res);
      },
      error: (err) => {
        console.log("An error has ocurred: ", err.statusText);
        this.message = "An error has ocurred: " + err.statusText;
      }
    })
  }

  removeArticle(article: Article): void {
    if (!confirm("Are you sure you want to delete the article "+article.title+"?")) {
      return;
    }

    this.newsService.deleteArticle(article).subscribe({
      next: () => {
        window.alert("The article has been removed");
        this.getArticleList();
      },
      error: (err) => {
        console.error('Error deleting article:', err);
        window.alert("An error has ocurred: " + err.statusText);
      }
      }
    );
  }
}