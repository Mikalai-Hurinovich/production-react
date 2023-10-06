import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SortOrder } from 'shared/types/sortOrder';
import { ArticleType } from 'entities/Article/model/types/article';
import { ArticleSortFieldEnum } from '../types/articlesSortField';
import { ArticlesSortSchema } from '../types/articlesSortSchema';

const initialState: ArticlesSortSchema = {
    isLoading: false,
    error: undefined,
    order: 'asc',
    search: '',
    sort: ArticleSortFieldEnum.CREATED,
    type: ArticleType.ALL,
};

export const articlesSortSlice = createSlice({
    name: 'articlesPage/sort',
    initialState,
    reducers: {
        setOrder: (state, action: PayloadAction<SortOrder>) => {
            state.order = action.payload;
        },
        setSearch: (state, action: PayloadAction<string>) => {
            state.search = action.payload;
        },
        setSortField: (state, action: PayloadAction<ArticleSortFieldEnum>) => {
            state.sort = action.payload;
        },
        setType: (state, action: PayloadAction<ArticleType>) => {
            state.type = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { actions: articlesSortActions } = articlesSortSlice;
export const { reducer: articlesSortReducer } = articlesSortSlice;
