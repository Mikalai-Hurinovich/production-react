import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import * as userAuthSelectors from 'entities/User';
import { IUser } from 'entities/User';
import { ArticleBlockType, ArticleType, IArticle } from 'entities/Article/model/types/article';
import * as articleSelectors from 'entities/Article';
import { addArticleComment } from './addArticleComment';

let commentData: IUser;
let article: IArticle;
jest.mock('entities/User');
jest.mock('entities/Article');
const getUserAuthData = userAuthSelectors.getUserAuthData as jest.Mock;
const getArticleDetailsData = articleSelectors.getArticleDetailsData as jest.Mock;

// Provide mock implementations for the selectors function
getUserAuthData.mockImplementation(() => ({
    id: '3',
    username: 'Mikola',
    avatar: 'https://imgv3.fotor.com/images/gallery/american-anime-stule-naked-man-avatar.jpg',
}));

getArticleDetailsData.mockImplementation(() => article);

describe('addArticleComment.test', () => {
    beforeEach(() => {
        article = {
            id: '1',
            title: 'Javascript news',
            subtitle: 'Что нового в JS за 2022 год?',
            img: 'https://teknotower.com/wp-content/uploads/2020/11/js.png',
            views: 1022,
            createdAt: '26.02.2022',
            type: [
                ArticleType.IT,
            ],
            blocks: [
                {
                    id: '5',
                    type: ArticleBlockType.TEXT,
                    title: 'Заголовок этого блока',
                    paragraphs: [
                        'Программа, которую по традиции называют «Hello, world!», очень проста. Она выводит куда-либо фразу «Hello, world!», или другую подобную, средствами некоего языка.',
                        'Существуют и другие способы запуска JS-кода в браузере. Так, если говорить об обычном использовании программ на JavaScript, они загружаются в браузер для обеспечения работы веб-страниц. Как правило, код оформляют в виде отдельных файлов с расширением .js, которые подключают к веб-страницам, но программный код можно включать и непосредственно в код страницы. Всё это делается с помощью тега  Когда браузер обнаруживает такой код, он выполняет его. Подробности о теге script можно посмотреть на сайте w3school.com. В частности, рассмотрим пример, демонстрирующий работу с веб-страницей средствами JavaScript, приведённый на этом ресурсе. Этот пример можно запустить и средствами данного ресурса (ищите кнопку Try it Yourself), но мы поступим немного иначе. А именно, создадим в каком-нибудь текстовом редакторе (например — в VS Code или в Notepad++) новый файл, который назовём hello.html, и добавим в него следующий код:',
                    ],
                },
            ],
        };
        commentData = {
            id: '1',
            username: 'admin',
            avatar: 'https://imgv3.fotor.com/images/gallery/american-anime-stule-naked-man-avatar.jpg',
        };
    });
    test('success add comment', async () => {
        const comment = 'Some comment';
        const thunk = new TestAsyncThunk(addArticleComment);
        thunk.api.post.mockReturnValue(Promise.resolve({ data: commentData }));
        const res = await thunk.callThunk(comment);
        expect(thunk.dispatch).toHaveBeenCalledTimes(3);
        expect(thunk.api.post).toHaveBeenCalled();
        expect(res.meta.requestStatus).toBe('fulfilled');
        expect(res.meta.arg).toBe(comment);
        expect(res.payload).toEqual(commentData);
    });
    test('error add comment', async () => {
        const comment = 'Some comment';
        const thunk = new TestAsyncThunk(addArticleComment);
        thunk.api.post.mockReturnValue(Promise.resolve({ status: 403 }));
        const res = await thunk.callThunk(comment);
        expect(thunk.dispatch).toHaveBeenCalledTimes(2);
        expect(thunk.api.post).toHaveBeenCalled();
        expect(res.meta.requestStatus).toBe('rejected');
        expect(res.meta.arg).toBe(comment);
        expect(res.payload).toEqual('error');
    });
});
