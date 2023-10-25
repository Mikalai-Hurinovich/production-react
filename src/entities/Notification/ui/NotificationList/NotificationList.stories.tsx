import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
import withMock from 'storybook-addon-mock';
import { NotificationList } from './NotificationList';

export default {
    title: 'shared/NotificationList',
    component: NotificationList,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    decorators: [withMock],
} as ComponentMeta<typeof NotificationList>;
const notifications = [
    {
        id: '1',
        title: 'Notification 1',
        description: 'Some event occurred',
        userId: '1',
    },
    {
        id: '2',
        title: 'Notification 2',
        description: 'Some event occurred',
        userId: '1',
        href: 'https://google.com',
    },
    {
        id: '3',
        title: 'Notification 3',
        description: 'Some event occurred',
        userId: '1',
        href: 'https://google.com',
    },
];
const Template: ComponentStory<typeof NotificationList> = (args) => <NotificationList {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
Normal.decorators = [StoreDecorator({})];
Normal.parameters = {
    mockData: [
        {
            url: `${__API__}/notifications`,
            method: 'GET',
            status: 200,
            response: notifications,
        },
    ],
};
