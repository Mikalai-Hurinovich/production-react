export {
    ArticleDetailsPageAsync as ArticleDetailsPage,
} from './ui/ArticleDetailsPage/ArticleDetailsPage.async';

export type { ArticleDetailsCommentsSchema } from './model/types/ArticleDetailsCommentsSchema';
export { addArticleComment } from 'pages/ArticleDetailsPage/model/services/addArticleComment/addArticleComment';
export {
    articleDetailsCommentsActions, articleDetailsCommentsReducer,
} from './model/slices/articleDetailsCommentsSlice';
export {
    getArticleDetailsRecommendationsError, getArticleDetailsRecommendationsIsLoading,
} from './model/selectors/articleRecommendationsSelectors';
export {
    getArticleCommentsError, getArticleCommentsIsLoading,
} from './model/selectors/commentsSelectors';

export type { ArticleDetailsRecommendationsSchema } from './model/types/ArticleDetailsRecommendationsSchema';
export type { ArticleDetailsPageSchema } from './model/types/articleDetailsPageSchema';
export { articleDetailsPageReducer } from './model/slices/index';
