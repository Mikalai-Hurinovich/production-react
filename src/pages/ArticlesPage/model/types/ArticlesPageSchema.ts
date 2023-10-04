import { EntityState } from '@reduxjs/toolkit';
import { ArticleViewEnum, IArticle } from 'entities/Article';

export interface ArticlesPageSchema extends EntityState<IArticle> {
    // pagination
    page: number;
    hasMore: boolean;
    limit?: number;

    view: ArticleViewEnum;
    isLoading?: boolean;
    error?: string;

}
