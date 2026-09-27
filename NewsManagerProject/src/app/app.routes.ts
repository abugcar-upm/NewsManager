import { Routes } from '@angular/router';
import { ArticleList } from './article-list/article-list';


export const routes: Routes = [
    { path: '', component: ArticleList },
    { path: ':category', component: ArticleList },
];
