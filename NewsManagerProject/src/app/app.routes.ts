import { Routes } from '@angular/router';
import { ArticleList } from './article-list/article-list';
import { ArticleDetails } from './article-details/article-details';
import { ArticleEdition } from './article-edition/article-edition';

export const routes: Routes = [
    { path: '', component: ArticleList },
    { path: 'create', component: ArticleEdition },
    { path: ':category', component: ArticleList },
    { path: 'article/:id', component: ArticleDetails },
    { path: 'edit/:id', component: ArticleEdition },
];
