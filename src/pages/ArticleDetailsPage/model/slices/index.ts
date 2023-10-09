import { combineReducers } from '@reduxjs/toolkit';
import { articleDetailsCommentsReducer, ArticleDetailsPageSchema } from 'pages/ArticleDetailsPage';
import { articleDetailsRecommendationsReducer } from 'pages/ArticleDetailsPage/model/slices/articleDetailsRecomendationsSlice';

export const articleDetailsPageReducer = combineReducers<ArticleDetailsPageSchema>({
    comments: articleDetailsCommentsReducer,
    recommendations: articleDetailsRecommendationsReducer,
});
