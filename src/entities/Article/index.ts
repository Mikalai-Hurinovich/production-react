export {
    ArticleDetails,
} from './ui/ArticleDetails/ArticleDetails';

export type { IArticle } from './model/types/article';
export type { ArticleDetailsSchema } from './model/types/articleDetailsSchema';
export {
    getArticleDetailsData, getArticleDetailsIsLoading, getArticleDetailsError,
} from './model/selectors/articleDetails';
