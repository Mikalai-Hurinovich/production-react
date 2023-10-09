import { EntityState } from '@reduxjs/toolkit';
import { IComment } from 'entities/Comment';
import { IArticle } from 'entities/Article';

export interface ArticleDetailsRecommendationsSchema extends EntityState<IArticle> {
  isLoading?: boolean;
  error?: string;
}
