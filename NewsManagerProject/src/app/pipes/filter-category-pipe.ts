import { Pipe, PipeTransform } from '@angular/core';
import { Article } from '../interfaces/article';

@Pipe({
  name: 'filterCategory',
})
export class FilterCategoryPipe implements PipeTransform {
  transform(articles: Article[] | null, category: string | null): Article[] {
    if (!articles) return [];
    if (!category) return articles;
    return articles.filter(article => article.category.toLowerCase() === category.toLowerCase());;
  }
}
