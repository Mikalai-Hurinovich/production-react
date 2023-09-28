import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { fetchCommentsByArticleId } from './fetchCommentsByArticleId';

const data = [
    {
        id: '1',
        body: 'some comment',
        articleId: '1',
        userId: '1',
    },
    {
        id: '2',
        body: 'some comment',
        articleId: '1',
        userId: '2',
    },
    {
        id: '2',
        body: 'some comment',
        articleId: '1',
        userId: '2',
    }];
describe('fetchCommentsByArticleId.test', () => {
    test('success', async () => {
        const thunk = new TestAsyncThunk(fetchCommentsByArticleId);
        thunk.api.get.mockReturnValue(Promise.resolve({ data }));

        const res = await thunk.callThunk('1');
        expect(thunk.api.get).toHaveBeenCalled();
        expect(res.meta.requestStatus).toBe('fulfilled');
        expect(res.payload).toEqual(data);
    });
    test('rejected', async () => {
        const thunk = new TestAsyncThunk(fetchCommentsByArticleId);
        thunk.api.get.mockReturnValue(Promise.resolve({ status: 403 }));

        const res = await thunk.callThunk('1');
        expect(thunk.api.get).toHaveBeenCalled();
        expect(res.meta.requestStatus).toBe('rejected');
        expect(res.payload).toEqual('error');
    });
});
