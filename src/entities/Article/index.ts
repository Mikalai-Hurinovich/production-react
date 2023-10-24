export {
    ArticleDetails,
} from './ui/ArticleDetails/ArticleDetails';

export type { IArticle } from './model/types/article';
export type { ArticleDetailsSchema } from './model/types/articleDetailsSchema';
export {
    getArticleDetailsData, getArticleDetailsIsLoading, getArticleDetailsError,
} from './model/selectors/articleDetails';
export { ArticleList } from './ui/ArticleList/ArticleList';
export { ArticleListItem } from './ui/ArticleListItem/ArticleListItem';
export { ArticleListItemSkeleton } from './ui/ArticleListItem/ArticleListItemSkeleton';

export { ArticleViewEnum } from 'entities/Article/model/types/article';
