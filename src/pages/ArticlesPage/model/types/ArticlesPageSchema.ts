import { EntityState } from '@reduxjs/toolkit';
import { ArticleViewEnum, IArticle } from 'entities/Article';

export interface ArticlesPageSchema extends EntityState<IArticle> {
  // pagination
  page: number;
  hasMore: boolean;
  limit: number;

  isLoading?: boolean;
  error?: string;
  view: ArticleViewEnum;

  _inited: boolean;

}
