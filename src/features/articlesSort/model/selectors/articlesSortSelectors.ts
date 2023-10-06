import { StateSchema } from 'app/providers/StoreProvider';
import { ArticleSortFieldEnum } from 'features/articlesSort';
import { ArticleType } from 'entities/Article/model/types/article';

export const getArticlesSortIsLoading = (state: StateSchema) => state.articlesSort?.isLoading;
export const getArticlesSortField = (state: StateSchema) => state.articlesSort?.sort ?? ArticleSortFieldEnum.CREATED;
export const getArticlesSortSearch = (state: StateSchema) => state.articlesSort?.search ?? '';
export const getArticlesSortOrder = (state: StateSchema) => state.articlesSort?.order ?? 'asc';
export const getArticlesSortError = (state: StateSchema) => state.articlesSort?.error;
export const getArticlesSortType = (state: StateSchema) => state.articlesSort?.type ?? ArticleType.ALL;
