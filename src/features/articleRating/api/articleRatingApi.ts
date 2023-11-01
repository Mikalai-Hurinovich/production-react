import { rtkApi } from 'shared/api/rtkApi';
import { IArticleRating } from '../model/types';

const articleRatingApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getArticleRatings: build.query<IArticleRating[], string>({
            query: (articleId: string) => ({
                url: '/article-ratings',
                params: {
                    articleId,
                },
            }),
            providesTags: ['Rating'],
        }),
        getArticleRatingByUserId: build.query<IArticleRating[], { articleId: string, userId: string }>({
            query: ({ articleId, userId }) => ({
                url: '/article-ratings',
                params: {
                    articleId,
                    userId,
                },
                invalidatesTags: ['Rating'],
            }),
        }),
        setArticleRating: build.mutation<IArticleRating[], { articleId: string, rating: number, userId: string }>({
            query: ({ articleId, rating, userId }) => ({
                url: '/article-ratings',
                method: 'POST',
                body: {
                    value: rating,
                    userId,
                    articleId,
                },
            }),
            invalidatesTags: ['Rating'],
        }),
    }),
});

export const useArticleRating = articleRatingApi.useGetArticleRatingsQuery;
export const useArticleRatingByUserId = articleRatingApi.useGetArticleRatingByUserIdQuery;
export const usePostArticleRating = articleRatingApi.useSetArticleRatingMutation;
