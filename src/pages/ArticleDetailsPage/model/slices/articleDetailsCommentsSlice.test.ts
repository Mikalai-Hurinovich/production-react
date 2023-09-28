import { articleDetailsCommentsReducer } from './articleDetailsCommentsSlice';
import { ArticleDetailsCommentsSchema } from '../types/ArticleDetailsCommentsSchema';
import { fetchCommentsByArticleId } from '../services/fetchCommentsByArticleId/fetchCommentsByArticleId';

const data = [{
    id: '2',
    body: 'some comment 2',
    user: {
        id: '1',
        avatar: 'https://imgv3.fotor.com/images/gallery/american-anime-stule-naked-man-avatar.jpg',
        username: 'User',
    },
}];
describe('articleDetailsCommentSlice.test', () => {
    test('test fetchCommentsByArticleId fulfilled', () => {
        const state: DeepPartial<ArticleDetailsCommentsSchema> = { isLoading: true };
        const res = articleDetailsCommentsReducer(
            state as ArticleDetailsCommentsSchema,
            fetchCommentsByArticleId.fulfilled(data, '', '1'),
        );

        expect(res.isLoading).toEqual(false);
        expect(res.error).toEqual(undefined);
        expect(res.ids).toStrictEqual(['2']);
        expect(res.entities).toStrictEqual({ 2: data[0] });
    });
    test('test fetchCommentsByArticleId pending', () => {
        const state: DeepPartial<ArticleDetailsCommentsSchema> = { isLoading: true };
        const res = articleDetailsCommentsReducer(
            state as ArticleDetailsCommentsSchema,
            fetchCommentsByArticleId.pending,
        );
        expect(res.isLoading).toEqual(true);
        expect(res.error).toEqual(undefined);
        expect(res.ids).toBe(undefined);
        expect(res.entities).toBe(undefined);
    });
});
