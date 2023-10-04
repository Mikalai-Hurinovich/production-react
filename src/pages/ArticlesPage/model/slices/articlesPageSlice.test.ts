import { ArticleViewEnum, IArticle } from 'entities/Article';
import { ArticleBlockType, ArticleType } from 'entities/Article/model/types/article';
import { articlesPageReducer } from './articlesPageSlice';
import { ArticlesPageSchema } from '../types/ArticlesPageSchema';
import { fetchArticles } from '../services/fetchArticles/fetchArticles';

const articles = [{
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
            id: '1',
            type: ArticleBlockType.TEXT,
            title: 'Заголовок этого блока',
            paragraphs: [
                'Программа, которую по традиции называют «Hello, world!», очень проста. Она выводит куда-либо фразу «Hello, world!», или другую подобную, средствами некоего языка.',
                'JavaScript — это язык, программы на котором можно выполнять в разных средах. В нашем случае речь идёт о браузерах и о серверной платформе Node.js. Если до сих пор вы не написали ни строчки кода на JS и читаете этот текст в браузере, на настольном компьютере, это значит, что вы буквально в считанных секундах от своей первой JavaScript-программы.',
                'Существуют и другие способы запуска JS-кода в браузере. Так, если говорить об обычном использовании программ на JavaScript, они загружаются в браузер для обеспечения работы веб-страниц. Как правило, код оформляют в виде отдельных файлов с расширением .js, которые подключают к веб-страницам, но программный код можно включать и непосредственно в код страницы. Всё это делается с помощью тега <script>. Когда браузер обнаруживает такой код, он выполняет его. Подробности о теге script можно посмотреть на сайте w3school.com. В частности, рассмотрим пример, демонстрирующий работу с веб-страницей средствами JavaScript, приведённый на этом ресурсе. Этот пример можно запустить и средствами данного ресурса (ищите кнопку Try it Yourself), но мы поступим немного иначе. А именно, создадим в каком-нибудь текстовом редакторе (например — в VS Code или в Notepad++) новый файл, который назовём hello.html, и добавим в него следующий код:',
            ],
        },
        {
            id: '4',
            type: ArticleBlockType.CODE,
            code: '<!DOCTYPE html>\n<html>\n  <body>\n    <p id="hello"></p>\n\n    <script>\n      document.getElementById("hello").innerHTML = "Hello, world!";\n    </script>\n  </body>\n</html>;',
        },
    ],
    user: {
        id: '1',
        username: 'admin',
        avatar: 'https://imgv3.fotor.com/images/gallery/american-anime-stule-naked-man-avatar.jpg',
    },
}] as IArticle[];
const entities: Record<number, IArticle> = {
    1: {
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
                id: '1',
                type: ArticleBlockType.TEXT,
                title: 'Заголовок этого блока',
                paragraphs: [
                    'Программа, которую по традиции называют «Hello, world!», очень проста. Она выводит куда-либо фразу «Hello, world!», или другую подобную, средствами некоего языка.',
                    'JavaScript — это язык, программы на котором можно выполнять в разных средах. В нашем случае речь идёт о браузерах и о серверной платформе Node.js. Если до сих пор вы не написали ни строчки кода на JS и читаете этот текст в браузере, на настольном компьютере, это значит, что вы буквально в считанных секундах от своей первой JavaScript-программы.',
                    'Существуют и другие способы запуска JS-кода в браузере. Так, если говорить об обычном использовании программ на JavaScript, они загружаются в браузер для обеспечения работы веб-страниц. Как правило, код оформляют в виде отдельных файлов с расширением .js, которые подключают к веб-страницам, но программный код можно включать и непосредственно в код страницы. Всё это делается с помощью тега <script>. Когда браузер обнаруживает такой код, он выполняет его. Подробности о теге script можно посмотреть на сайте w3school.com. В частности, рассмотрим пример, демонстрирующий работу с веб-страницей средствами JavaScript, приведённый на этом ресурсе. Этот пример можно запустить и средствами данного ресурса (ищите кнопку Try it Yourself), но мы поступим немного иначе. А именно, создадим в каком-нибудь текстовом редакторе (например — в VS Code или в Notepad++) новый файл, который назовём hello.html, и добавим в него следующий код:',
                ],
            },
            {
                id: '4',
                type: ArticleBlockType.CODE,
                code: '<!DOCTYPE html>\n<html>\n  <body>\n    <p id="hello"></p>\n\n    <script>\n      document.getElementById("hello").innerHTML = "Hello, world!";\n    </script>\n  </body>\n</html>;',
            },
        ],
        user: {
            id: '1',
            username: 'admin',
            avatar: 'https://imgv3.fotor.com/images/gallery/american-anime-stule-naked-man-avatar.jpg',
        },
    },
};

describe('ArticlesPageSlice.test', () => {
    test('test ArticlesPage fulfilled', () => {
        const state: DeepPartial<ArticlesPageSchema> = {
            isLoading: false,
            error: '',
            ids: ['1'],
            entities,
            page: 1,
            hasMore: false,
            limit: 1,
            view: ArticleViewEnum.LIST,
        };
        const res = articlesPageReducer(
            state as ArticlesPageSchema,
            fetchArticles.fulfilled(articles, '1', { page: 1 }),
        );

        expect(res.isLoading).toEqual(false);
        expect(res.error).toEqual('');
        expect(res.ids).toStrictEqual(['1']);
        expect(res.entities).toStrictEqual({ 1: articles[0] });
    });
    test('test ArticlesPage rejected', () => {
        const state: DeepPartial<ArticlesPageSchema> = {
            isLoading: false,
            error: 'Unexpected Error',
            ids: [],
            entities: {},
            page: 1,
            hasMore: false,
            limit: 1,
            view: ArticleViewEnum.LIST,
        };
        const res = articlesPageReducer(
            state as ArticlesPageSchema,
            fetchArticles.rejected(new Error(), '1', { page: 1 }),
        );
        expect(res.isLoading).toEqual(false);
        expect(state.error).toEqual('Unexpected Error');
        expect(res.ids).toStrictEqual([]);
        expect(res.hasMore).toEqual(false);
        expect(res.entities).toStrictEqual({});
    });
    test('test ArticlesPage pending', () => {
        const state: DeepPartial<ArticlesPageSchema> = { isLoading: true };
        const res = articlesPageReducer(
            state as ArticlesPageSchema,
            fetchArticles.pending,
        );
        expect(res.isLoading).toEqual(true);
        expect(res.error).toEqual(undefined);
        expect(res.ids).toBe(undefined);
        expect(res.entities).toBe(undefined);
    });
});
