import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { IArticle } from 'entities/Article';
import { getArticlesPageLimit } from 'pages/ArticlesPage';

export const fetchArticleRecommendations = createAsyncThunk<
  IArticle[],
  void,
  ThunkConfig<string>
>(
    'articlesPage/fetchArticleRecommendations',
    async (_, thunkApi) => {
        const { extra, rejectWithValue, getState } = thunkApi;
        const articleRecommendationsLimit = 4;

        try {
            const response = await extra.api.get<IArticle[]>('/articles', {
                params: {
                    _expand: 'user',
                    _limit: articleRecommendationsLimit,
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
