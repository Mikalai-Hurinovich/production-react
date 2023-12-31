import { ArticlesPageAsync } from './ui/ArticlesPage/ArticlesPage.async';

export type { ArticlesPageSchema } from './model/types/ArticlesPageSchema';
export { articlesPageActions, articlesPageReducer, getArticles } from './model/slices/articlesPageSlice';
export { fetchArticles } from './model/services/fetchArticles/fetchArticles';
export { fetchNextArticlesPage } from './model/services/fetchNextArticles/fetchNextArticlesPage';

export {
    ArticlesPageAsync as ArticlesPage,
};

export {
    getArticlesPageIsLoading,
    getArticlesPageError,
    getArticlesPageView,
    getArticlesPageNumber,
    getArticlesPageLimit,
    getArticlesPageHasMore,
    getArticlesPageInited,
} from './model/selectors/articlesPageSelectors';
