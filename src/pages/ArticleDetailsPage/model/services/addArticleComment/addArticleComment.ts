import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { IComment } from 'entities/Comment';
import { getUserAuthData } from 'entities/User';
import { getArticleDetailsData } from 'entities/Article';
import { fetchCommentsByArticleId } from '../fetchCommentsByArticleId/fetchCommentsByArticleId';

export const addArticleComment = createAsyncThunk<IComment,
    string,
    ThunkConfig<string>>(
        'addCommentForm/addArticleComment',
        async (commentText, thunkApi) => {
            const {
                extra, rejectWithValue, getState, dispatch,
            } = thunkApi;

            try {
                const userData = getUserAuthData(getState());
                const article = getArticleDetailsData(getState());

                if (!userData || !commentText || !article) {
                    return rejectWithValue('Data Error');
                }

                const newArticleComment = {
                    body: commentText,
                    articleId: article?.id,
                    userId: userData?.id!,
                };
                const response = await extra.api.post<IComment>('/comments', newArticleComment);

                if (!response.data) {
                    throw new Error();
                }
                return response.data;
            } catch (e) {
                return rejectWithValue('error');
            }
        },
    );
