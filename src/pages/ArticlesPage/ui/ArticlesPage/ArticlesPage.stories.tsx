import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
import { ArticleViewEnum } from 'entities/Article';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { ArticleBlockType, ArticleType } from 'entities/Article/model/types/article';
import ArticlesPage from './ArticlesPage';

export default {
    title: 'pages/ArticlesPage',
    component: ArticlesPage,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ArticlesPage>;
const entities = {
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
const Template: ComponentStory<typeof ArticlesPage> = (args) => <ArticlesPage {...args} />;

export const ListView = Template.bind({});
ListView.args = {};
ListView.decorators = [StoreDecorator({
    articlesPage: {
        isLoading: false,
        error: '',
        ids: ['1'],
        entities,
        page: 1,
        hasMore: false,
        limit: 1,
        view: ArticleViewEnum.LIST,
    },
})];
export const ListViewDark = Template.bind({});
ListViewDark.args = {};
ListViewDark.decorators = [StoreDecorator({
    articlesPage: {
        isLoading: false,
        error: '',
        ids: ['1'],
        entities,
        page: 1,
        hasMore: false,
        limit: 1,
        view: ArticleViewEnum.LIST,
    },
}), ThemeDecorator(Theme.DARK)];
export const LoadingPlateView = Template.bind({});
LoadingPlateView.args = {};
LoadingPlateView.decorators = [StoreDecorator({
    articlesPage: {
        isLoading: true,
        error: '',
        ids: ['1'],
        entities,
        page: 1,
        hasMore: false,
        limit: 1,
        view: ArticleViewEnum.PLATE,
    },
})];
export const PlateView = Template.bind({});
PlateView.args = {};
PlateView.decorators = [StoreDecorator({
    articlesPage: {
        isLoading: false,
        error: '',
        ids: ['1'],
        entities,
        page: 1,
        hasMore: false,
        limit: 10,
        view: ArticleViewEnum.PLATE,
    },
})];

export const DarkPlateView = Template.bind({});
DarkPlateView.args = {};
DarkPlateView.decorators = [StoreDecorator({
    articlesPage: {
        isLoading: false,
        error: '',
        ids: ['1'],
        entities,
        page: 1,
        hasMore: false,
        limit: 10,
        view: ArticleViewEnum.PLATE,
    },
}), ThemeDecorator(Theme.DARK)];
