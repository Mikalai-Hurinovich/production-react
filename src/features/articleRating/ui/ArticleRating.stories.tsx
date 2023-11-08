import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
import withMock from 'storybook-addon-mock';
import { ArticleRating } from './ArticleRating';

export default {
    title: 'shared/ArticleRating',
    component: ArticleRating,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    decorators: [withMock],
} as ComponentMeta<typeof ArticleRating>;

const Template: ComponentStory<typeof ArticleRating> = (args) => <ArticleRating {...args} />;

export const NoRating = Template.bind({});
NoRating.args = {
    id: '1',
};
NoRating.decorators = [StoreDecorator({})];
NoRating.parameters = {
    mockData: [
        {
            url: `${__API__}/article-ratings/*`,
            method: 'GET',
            status: 200,
            response: [
                {
                    id: '1',
                    value: 3,
                    userId: '1',
                    articleId: '1',
                },
            ],
        },
    ],
};
