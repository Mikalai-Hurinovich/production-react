import { StateSchema } from 'app/providers/StoreProvider';
import {
    getArticleCommentsError,
    getArticleCommentsIsLoading,
} from 'pages/ArticleDetailsPage/model/selectors/commentsSelectors';

describe('commentsSelectors.test', () => {
    test('should return comments loading state', () => {
        const state: DeepPartial<StateSchema> = { articleDetailsComments: { isLoading: true } };
        expect(getArticleCommentsIsLoading(state as StateSchema)).toEqual(true);
    });
    test('should return comments error value', () => {
        const state: DeepPartial<StateSchema> = { articleDetailsComments: { error: 'error' } };
        expect(getArticleCommentsError(state as StateSchema)).toEqual('error');
    });
});
