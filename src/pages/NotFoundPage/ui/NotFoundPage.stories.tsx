import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
import { NotFoundPage } from './NotFoundPage';

export default {
    title: 'pages/NotFoundPage',
    component: NotFoundPage,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof NotFoundPage>;

const Template: ComponentStory<typeof NotFoundPage> = (args) => <NotFoundPage {...args} />;

export const Normal = Template.bind({});
Normal.decorators = [StoreDecorator({
    scrollSave: {
        scroll: { '/404': 0 },
    },
})];

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [StoreDecorator({
    scrollSave: {
        scroll: { '/404': 0 },
    },
}), ThemeDecorator(Theme.DARK)];
