import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NewsService } from '../services/news';
import { Article } from '../interfaces/article';
import { combineLatest, Observable } from 'rxjs'
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { RouterLink } from '@angular/router';
import * as _ from 'lodash';

@Component({
  imports: [FormsModule, CommonModule, RouterLink],
  selector: 'app-article-list',
  styleUrl: './article-list.css',
  templateUrl: './article-list.html',
})
export class ArticleList {
  article: Article = {
    id: 0,
    id_user: 0,
    abstract: '',
    subtitle: '',
    update_date: '',
    category: 'National',
    title: '',
    thumbnail_image: '',
    thumbnail_media_type: '',
    image_data: '',
    image_media_type: '',
  };
  articlesList$!: Observable<Article[]>;
  filteredArticles$!: Observable<Article[]>;
  imageError: string | null = null;
  isImageSaved: boolean = false;
  cardImageBase64: string | null = null;
  category!: Observable<string | null>;

  constructor(private newsService: NewsService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.articlesList$ = this.newsService.getArticles();
    this.category = this.route.paramMap.pipe(
      map(params => params.get('category'))
    );

    this.filteredArticles$ = combineLatest([this.articlesList$, this.category]).pipe(
      map(([articles, category]) =>
        category
          ? articles.filter(a => a.category?.toLowerCase() === category.toLowerCase())
          : articles
      )
    );
  }

  fileChangeEvent(fileInput: any) {
    this.imageError = null;
    if (fileInput.target.files && fileInput.target.files[0]) {
      // Size Filter Bytes
      const MAX_SIZE = 20971520;
      const ALLOWED_TYPES = ['image/png', 'image/jpeg'];

      if (fileInput.target.files[0].size > MAX_SIZE) {
        this.imageError =
          'Maximum size allowed is ' + MAX_SIZE / 1000 + 'Mb';
        return false;
      }
      if (!_.includes(ALLOWED_TYPES, fileInput.target.files[0].type)) {
        this.imageError = 'Only Images are allowed ( JPG | PNG )';
        return false;
      }
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = rs => {
          const imgBase64Path = e.target.result;
          this.cardImageBase64 = imgBase64Path;
          this.isImageSaved = true;

          this.article.image_media_type = fileInput.target.files[0].type;
          const head = this.article.image_media_type.length + 13;
          this.article.image_data = e.target.result.substring(head, e.target.result.length);

        };
      };
      reader.readAsDataURL(fileInput.target.files[0]);
    }
    return true;
  }

}
