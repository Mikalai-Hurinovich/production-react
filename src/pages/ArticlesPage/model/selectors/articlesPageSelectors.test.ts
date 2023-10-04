import { StateSchema } from 'app/providers/StoreProvider';
import { ArticleViewEnum } from 'entities/Article';
import {
    getArticlesPageError,
    getArticlesPageHasMore,
    getArticlesPageInited,
    getArticlesPageIsLoading,
    getArticlesPageLimit,
    getArticlesPageNumber,
    getArticlesPageView,
} from './articlesPageSelectors';

describe('', () => {
    test('should return articlesPage number', () => {
        const state: DeepPartial<StateSchema> = {
            articlesPage: {
                page: 1,
            },
        };
        expect(getArticlesPageNumber(state as StateSchema)).toEqual(1);
    });
    test('should return articlesPage isLoading', () => {
        const state: DeepPartial<StateSchema> = {
            articlesPage: {
                isLoading: true,
            },
        };
        expect(getArticlesPageIsLoading(state as StateSchema)).toEqual(true);
    });
    test('should return articlesPage error', () => {
        const state: DeepPartial<StateSchema> = {
            articlesPage: {
                error: 'Error',
            },
        };
        expect(getArticlesPageError(state as StateSchema)).toEqual('Error');
    });
    test('should return articlesPage hasMore', () => {
        const state: DeepPartial<StateSchema> = {
            articlesPage: {
                hasMore: true,
            },
        };
        expect(getArticlesPageHasMore(state as StateSchema)).toEqual(true);
    });
    test('should return articlesPage limit', () => {
        const state: DeepPartial<StateSchema> = {
            articlesPage: {
                limit: 10,
            },
        };
        expect(getArticlesPageLimit(state as StateSchema)).toEqual(10);
    });
    test('should return articlesPage view', () => {
        const state: DeepPartial<StateSchema> = {
            articlesPage: {
                view: ArticleViewEnum.LIST,
            },
        };
        expect(getArticlesPageView(state as StateSchema)).toEqual(ArticleViewEnum.LIST);
    });
    test('should return articlesPage inited', () => {
        const state: DeepPartial<StateSchema> = {
            articlesPage: {
                _inited: false,
            },
        };
        expect(getArticlesPageInited(state as StateSchema)).toEqual(false);
    });
});
