import { Pipe, PipeTransform } from '@angular/core';
import { Article } from '../interfaces/article';

@Pipe({
  name: 'categoryFilterPipe',
})
export class CategoryFilterPipePipe implements PipeTransform {
  transform(articles: Article[] | null, category: string | null): Article[] {
    if (!articles) return [];
    if (!category) return articles;

    const wanted = category.toLowerCase();
    return articles.filter(a => a.category?.toLowerCase() === wanted);
  }
}
