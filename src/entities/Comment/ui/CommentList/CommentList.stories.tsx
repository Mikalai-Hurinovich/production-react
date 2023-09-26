import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { CommentList } from './CommentList';

export default {
    title: 'shared/CommentList',
    component: CommentList,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof CommentList>;

const Template: ComponentStory<typeof CommentList> = (args) => <CommentList {...args} />;

export const Normal = Template.bind({});
Normal.args = {
    comments: [
        {
            id: '1',
            body: 'some comment',
            user: {
                id: '1',
                avatar: 'https://imgv3.fotor.com/images/gallery/american-anime-stule-naked-man-avatar.jpg',
                username: 'User',
            },
        },
        {
            id: '2',
            body: 'some comment 2',
            user: {
                id: '1',
                avatar: 'https://imgv3.fotor.com/images/gallery/american-anime-stule-naked-man-avatar.jpg',
                username: 'User',
            },
        },
        {
            id: '3',
            body: 'some comment 3',
            user: {
                id: '1',
                avatar: 'https://imgv3.fotor.com/images/gallery/american-anime-stule-naked-man-avatar.jpg',
                username: 'User',
            },
        },
    ],
};

export const Dark = Template.bind({});
Dark.args = {
    comments: [
        {
            id: '1',
            body: 'some comment',
            user: {
                id: '1',
                avatar: 'https://imgv3.fotor.com/images/gallery/american-anime-stule-naked-man-avatar.jpg',
                username: 'User',
            },
        },
        {
            id: '2',
            body: 'some comment 2',
            user: {
                id: '1',
                avatar: 'https://imgv3.fotor.com/images/gallery/american-anime-stule-naked-man-avatar.jpg',
                username: 'User',
            },
        },
        {
            id: '3',
            body: 'some comment 3',
            user: {
                id: '1',
                avatar: 'https://imgv3.fotor.com/images/gallery/american-anime-stule-naked-man-avatar.jpg',
                username: 'User',
            },
        },
    ],
};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
