import { StateSchema } from 'app/providers/StoreProvider';
import { getArticleDetailsError } from './getArticleDetailsError';

describe('getArticleDetailsError.test', () => {
    test('should return data', () => {
        const error = 'Unexpected error';
        const state: DeepPartial<StateSchema> = {
            article: {
                error,
            },
        };
        expect(getArticleDetailsError(state as StateSchema)).toEqual(error);
    });
    test('should work with empty state', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getArticleDetailsError(state as StateSchema)).toEqual(undefined);
    });
});
