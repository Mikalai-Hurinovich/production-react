import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import {
    getArticlesPageHasMore,
    getArticlesPageIsLoading,
    getArticlesPageNumber,
} from '../../selectors/articlesPageSelectors';
import { articlesPageActions } from '../../slices/articlesPageSlice';
import { fetchArticles } from '../../services/fetchArticles/fetchArticles';

export const fetchNextArticlesPage = createAsyncThunk<
    void,
    void,
    ThunkConfig<string>>(
        'articlesPage/fetchNextArticlesPage',
        async (_, thunkApi) => {
            const {
                getState, dispatch,
            } = thunkApi;
            const hasMore = getArticlesPageHasMore(getState());
            const isLoading = getArticlesPageIsLoading(getState());
            if (hasMore && !isLoading) {
                const page = getArticlesPageNumber(getState());
                const nextPage = page + 1;
                dispatch(articlesPageActions.setPage(nextPage));
                dispatch(fetchArticles({
                    page: nextPage,
                }));
            }
        },
    );
