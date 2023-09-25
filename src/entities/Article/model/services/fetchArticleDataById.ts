import { createAsyncThunk } from '@reduxjs/toolkit';
import { IArticle } from 'entities/Article';
import { ThunkConfig } from 'app/providers/StoreProvider';

export const fetchArticleDataById = createAsyncThunk<IArticle,
    { id: IArticle['id'] }, ThunkConfig<string>>(
        'article/fetchArticleData',
        async ({ id }, thunkApi) => {
            const { extra, rejectWithValue } = thunkApi;

            try {
                const response = await extra.api.get<IArticle>(`/articles/${id}`);

                if (!response.data) {
                    throw new Error();
                }

                return response.data;
            } catch (e) {
                console.log(e);
                return rejectWithValue('error');
            }
        },
    );
