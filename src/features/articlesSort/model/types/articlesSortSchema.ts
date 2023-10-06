import { ArticleSortFieldEnum } from 'features/articlesSort';
import { SortOrder } from 'shared/types/sortOrder';
import { ArticleType } from 'entities/Article/model/types/article';

export interface ArticlesSortSchema {
  isLoading: boolean,
  error?: string,

  order: SortOrder;
  search: string;
  sort: ArticleSortFieldEnum;
  type: ArticleType;
}
