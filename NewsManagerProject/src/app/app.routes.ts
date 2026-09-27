import { Routes } from '@angular/router';
import { ArticleList } from './article-list/article-list';
import { ArticleDetails } from './article-details/article-details';


export const routes: Routes = [
    { path: '', component: ArticleList },
    { path: ':category', component: ArticleList },
    { path: 'article/:id', component: ArticleDetails },
];
