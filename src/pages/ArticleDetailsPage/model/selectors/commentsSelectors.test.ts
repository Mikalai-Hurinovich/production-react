import { StateSchema } from 'app/providers/StoreProvider';
import {
    getArticleCommentsError,
    getArticleCommentsIsLoading,
} from './commentsSelectors';

describe('commentsSelectors.test', () => {
    test('should return comments loading state', () => {
        const state: DeepPartial<StateSchema> = {
            articleDetailsPage: {
                comments: {
                    isLoading: true,
                },
            },
        };
        expect(getArticleCommentsIsLoading(state as StateSchema)).toEqual(true);
    });
    test('should return comments error value', () => {
        const state: DeepPartial<StateSchema> = {
            articleDetailsPage: {
                comments: {
                    error: 'error',
                },
            },
        };
        expect(getArticleCommentsError(state as StateSchema)).toEqual('error');
    });
});
