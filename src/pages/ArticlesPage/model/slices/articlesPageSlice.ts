import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import { ARTICLES_PAGE_VIEW } from 'shared/const/localstorage';
import { ArticleViewEnum, IArticle } from '../../../../entities/Article';
import { ArticlesPageSchema } from '../types/ArticlesPageSchema';
import { fetchArticles } from '../../model/services/fetchArticles/fetchArticles';

const articlesPageAdapter = createEntityAdapter<IArticle>({
    selectId: (article) => article.id,
});

export const getArticles = articlesPageAdapter.getSelectors<StateSchema>(
    (state) => state.articlesPage || articlesPageAdapter.getInitialState(),
);

const articlesPageSlice = createSlice({
    name: 'articlesPageSlice',
    initialState: articlesPageAdapter.getInitialState<ArticlesPageSchema>({
        isLoading: false,
        error: undefined,
        ids: [],
        entities: {},
        view: 'PLATE' as ArticleViewEnum,
        page: 1,
        hasMore: false,
        limit: 2,
        _inited: false,
    }),
    reducers: {
        setView: (state, action) => {
            state.view = action.payload;
            localStorage.setItem(ARTICLES_PAGE_VIEW, action.payload);
        },
        initPage: (state) => {
            const view = localStorage.getItem(ARTICLES_PAGE_VIEW) as ArticleViewEnum;
            state.view = view;
            state.limit = view === ArticleViewEnum.PLATE ? 4 : 9;
            state._inited = true;
        },
        setPage: (state, action) => {
            state.page = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchArticles.pending, (state, action) => {
                state.error = undefined;
                state.isLoading = true;
                if (action.meta?.arg?.replace) {
                    articlesPageAdapter.removeAll(state);
                }
            })
            .addCase(fetchArticles.fulfilled, (
                state,
                action,
            ) => {
                state.isLoading = false;
                state.hasMore = action.payload.length >= state.limit;
                if (action.meta.arg.replace) {
                    articlesPageAdapter.setAll(state, action.payload);
                } else {
                    articlesPageAdapter.addMany(state, action.payload);
                }
            })
            .addCase(fetchArticles.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { reducer: articlesPageReducer } = articlesPageSlice;
export const { actions: articlesPageActions } = articlesPageSlice;
