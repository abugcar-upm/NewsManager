import { Routes } from '@angular/router';
import { ArticleList } from './article-list/article-list';
import { ArticleDetails } from './article-details/article-details';
import { EditArticle } from './edit-article/edit-article';
import { CreateArticle } from './create-article/create-article';


export const routes: Routes = [
    { path: '', component: ArticleList },
    { path: 'create', component: CreateArticle },
    { path: ':category', component: ArticleList },
    { path: 'article/:id', component: ArticleDetails },
    { path: 'edit/:id', component: EditArticle },
];
