import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {Article} from '../interfaces/article';
import { NgClass } from '@angular/common';
import { CommonModule } from '@angular/common';
import { ViewChild } from '@angular/core';
import { NewsService } from '../services/news';
import * as _ from 'lodash';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs'


@Component({
  imports: [FormsModule, NgClass, CommonModule, RouterLink],
  selector: 'app-article-edition',
  styleUrl: './article-edition.css',
  templateUrl: './article-edition.html',
})

export class ArticleEdition {
  article!: Article;
  imageError: string | null = null;
  isImageSaved: boolean = false;
  cardImageBase64: string | null = null;
  articleId!: string | null;
  @ViewChild('articleForm') articleForm: any;
  @ViewChild('imageInput') image: any;

  constructor(private newsService: NewsService, private route: ActivatedRoute) {  }

  ngOnInit() {
    this.articleId = this.route.snapshot.paramMap.get('id');

    if(this.articleId!=null){
      this.newsService.getArticle(this.articleId).subscribe({
        next: (res) => {
          this.article = res;
        },
        error: (err) => {
          console.log(`An error has ocurred: ${err.statusText}`);
        }
      })
    }else{
      this.article = {
        id: 0,
        id_user: 0,
        abstract: '',
        subtitle: '',
        body:'',
        update_date: '',
        category: 'National',
        title: '',
        thumbnail_image: '',
        thumbnail_media_type: '',
        image_data: '',
        image_media_type: '',
      };
    }
  }

  submitForm(): void {
    if (this.articleId=null){
      window.alert("The article "+ this.article.title + " has been published");
      this.newsService.createArticle(this.article);
      this.articleForm.resetForm();
    }else{
      window.alert("The article "+ this.article.title + " has been edited");
      this.newsService.updateArticle(this.article);
      this.articleForm.resetForm();
    }
  }

  deleteFile(){
    this.image.nativeElement.value="";
  }

  setTitle(){
    if(this.articleId!=null){
      return "Edit article";
    }else{
      return "Create article";
    }
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