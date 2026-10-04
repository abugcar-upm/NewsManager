import { Component, ViewChild, signal } from '@angular/core';
import { CommonModule, NgClass, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {Article} from '../interfaces/article';
import { NewsService } from '../services/news';
import * as _ from 'lodash';

@Component({
  imports: [FormsModule, NgClass, CommonModule],
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
  errorMessage = signal<string | null>(null);
  message = signal<string | null>(null);
  @ViewChild('articleForm') articleForm: any;
  @ViewChild('imageInput') image: any;

  constructor(private newsService: NewsService, private route: ActivatedRoute, private location: Location) { 
  }

  ngOnInit() {
    this.message.set(null);
    this.errorMessage.set(null);
    this.articleId = this.route.snapshot.paramMap.get('id');

    if(this.articleId!=null){
      this.newsService.getArticle(this.articleId).subscribe({
        next: (res) => {
          this.article = res;
          console.log("Article loaded");
        },
        error: (err) => {
          console.log(`An error has ocurred: ${err.statusText}`);
          this.errorMessage.set(`An error has ocurred: ${err.statusText}`);
        }
    })}else{
      this.article = {
        abstract:"", 
        body:"",
        category:"",
        id_user:49,
        subtitle:"",
        image_data:"",
        image_media_type:"",
        title:"",
      }
    }
  }

  submitForm(): void {
    this.message.set(null);
    this.errorMessage.set(null);
    const newArticle = {
      ...this.article,
      title: this.replaceQuotes(this.article.title),
      subtitle: this.replaceQuotes(this.article.subtitle),
      abstract: this.replaceQuotes(this.article.abstract),
      body: this.replaceQuotes(this.article.body),
    };
    if (newArticle.id == null) {
      this.newsService.createArticle(newArticle).subscribe({
        next: () => {
          this.message.set(`The article "${newArticle.title}" has been created`);
          console.log(this.message());
        },
        error: (err) => {
          this.errorMessage.set(`An error has ocurred: ${err.statusText}`);
          console.log(`An error has ocurred: ${err.statusText}`);
        }
      });
    }else{
      this.newsService.updateArticle(newArticle).subscribe({
        next: () => {
          this.message.set("The article has been updated");
          console.log("Article updated");
        },
        error: (err) => {
          this.errorMessage.set(`An error has ocurred: ${err.statusText}`);
          console.log(`An error has ocurred: ${err.statusText}`);
        }
      });
    }
  }

  deleteFile(){
    this.image.nativeElement.value='';
    this.article.image_data = '';
    this.article.image_media_type = '';
  }

  setTitle(){
    if(this.articleId!=null){
      return "Edit article";
    }else{
      return "Create article";
    }
  }

  private replaceQuotes(text: string): string {
    return text.replace(/'/g, '’');
  }

  updateImagePreview() {
    console.log("Updating image preview");
    this.article.image_data = this.article.image_data;
  }

  goBack(): void {
    this.location.back();
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