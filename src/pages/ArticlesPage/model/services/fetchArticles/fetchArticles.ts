import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { IArticle } from 'entities/Article';
import {
    getArticlesSortField, getArticlesSortOrder, getArticlesSortSearch, getArticlesSortType,
} from 'features/articlesSort';
import { addQueryParams } from 'shared/lib/route/addQueryParams/addQueryParams';
import { ArticleType } from 'entities/Article/model/types/article';
import { getArticlesPageLimit, getArticlesPageNumber } from '../../selectors/articlesPageSelectors';

export const fetchArticles = createAsyncThunk<
  IArticle[],
  { replace?: boolean },
  ThunkConfig<string>
>(
    'articlesPage/fetchArticlesPage',
    async (_, thunkApi) => {
        const { extra, rejectWithValue, getState } = thunkApi;
        const limit = getArticlesPageLimit(getState());
        const search = getArticlesSortSearch(getState());
        const page = getArticlesPageNumber(getState());
        const order = getArticlesSortOrder(getState());
        const sort = getArticlesSortField(getState());
        const type = getArticlesSortType(getState());
        console.log(type);
        try {
            addQueryParams({ sort, order, search });
            const response = await extra.api.get<IArticle[]>('/articles', {
                params: {
                    _expand: 'user',
                    _limit: limit,
                    _page: page,
                    _sort: sort,
                    _order: order,
                    type: type === ArticleType.ALL ? undefined : type,
                    q: search,
                },
            });

            if (!response.data) {
                throw new Error('Unexpected Error');
            }

            return response.data;
        } catch (e) {
            return rejectWithValue('error');
        }
    },
);
