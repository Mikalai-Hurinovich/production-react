export {
    ArticleDetailsPageAsync as ArticleDetailsPage,
} from './ui/ArticleDetailsPage/ArticleDetailsPage.async';

export { ArticleDetailsCommentsSchema } from './model/types/ArticleDetailsCommentsSchema';
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

export { ArticleDetailsRecommendationsSchema } from './model/types/ArticleDetailsRecommendationsSchema';
export { ArticleDetailsPageSchema } from './model/types/articleDetailsPageSchema';
