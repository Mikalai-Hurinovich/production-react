import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { CommentCard } from './CommentCard';

export default {
    title: 'shared/CommentCard',
    component: CommentCard,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof CommentCard>;

const Template: ComponentStory<typeof CommentCard> = (args) => <CommentCard {...args} />;

export const Normal = Template.bind({});
Normal.args = {
    comment: {
        id: '1',
        body: 'some comment',
        user: {
            id: '1',
            avatar: 'https://imgv3.fotor.com/images/gallery/american-anime-stule-naked-man-avatar.jpg',
            username: 'User',
        },
    },
};

export const Dark = Template.bind({});
Dark.args = {
    comment: {
        id: '1',
        body: 'some comment',
        user: {
            id: '1',
            avatar: 'https://imgv3.fotor.com/images/gallery/american-anime-stule-naked-man-avatar.jpg',
            username: 'User',
        },
    },
};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
