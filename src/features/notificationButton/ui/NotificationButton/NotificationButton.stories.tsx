import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { StoreProvider } from 'app/providers/StoreProvider';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
import withMock from 'storybook-addon-mock';
import { NotificationButton } from './NotificationButton';

export default {
    title: 'shared/NotificationButton',
    component: NotificationButton,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    decorators: [withMock],
} as ComponentMeta<typeof NotificationButton>;
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
const Template: ComponentStory<typeof NotificationButton> = (args) => (
    <NotificationButton
        {...args}
    />
);

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
