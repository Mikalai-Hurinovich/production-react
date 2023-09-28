import { addCommentFormActions, addCommentFormReducer } from './addCommentFormSlice';
import { AddCommentFormSchema } from '../types/addCommentForm';

describe('AddCommentFormSlice.test', () => {
    test('test set text', () => {
        const state: DeepPartial<AddCommentFormSchema> = { text: 'text' };
        expect(addCommentFormReducer(
            state as AddCommentFormSchema,
            addCommentFormActions.setText('text1'),
        )).toEqual({ text: 'text1' });
    });
});
