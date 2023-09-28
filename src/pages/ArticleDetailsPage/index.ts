export {
    ArticleDetailsPageAsync as ArticleDetailsPage,
} from './ui/ArticleDetailsPage/ArticleDetailsPage.async';

export { ArticleDetailsCommentsSchema } from './model/types/ArticleDetailsCommentsSchema';
export { addArticleComment } from 'pages/ArticleDetailsPage/model/services/addArticleComment/addArticleComment';
export {
    articleDetailsCommentsActions, articleDetailsCommentsReducer,
} from './model/slices/articleDetailsCommentsSlice';
