import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ArticleSchema, IArticle } from '../types/article';
import { fetchArticleDataById } from '../services/fetchArticleDataById';

const initialState: ArticleSchema = {
    isLoading: false,
    error: undefined,
    data: undefined,
};
export const articleSlice = createSlice({
    name: 'article',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchArticleDataById.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchArticleDataById.fulfilled, (
                state,
                action: PayloadAction<IArticle>,
            ) => {
                state.isLoading = false;
                state.data = action.payload;
                state.error = undefined;
            })
            .addCase(fetchArticleDataById.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});
export const { actions: articleActions } = articleSlice;
export const { reducer: articleReducer } = articleSlice;
