import { rtkApi } from 'shared/api/rtkApi';

const commentsApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getArticleCommentsList: build.query({
            query: (articleId: string) => ({
                url: '/comments',
                params: {
                    articleId,
                    _expand: 'user',
                },
            }),
        }),
    }),
});

export const useArticleCommentsList = commentsApi.useGetArticleCommentsListQuery;
