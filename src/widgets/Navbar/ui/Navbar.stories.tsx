import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
import withMock from 'storybook-addon-mock';
import { Normal } from 'entities/Notification/ui/NotificationList/NotificationList.stories';
import { Navbar } from './Navbar';

export default {
    title: 'widget/Navbar',
    component: Navbar,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    decorators: [withMock],
} as ComponentMeta<typeof Navbar>;
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
const Template: ComponentStory<typeof Navbar> = (args) => <Navbar {...args} />;

export const Light = Template.bind({});
Light.args = {};
Light.decorators = [StoreDecorator({})];
export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK), StoreDecorator({})];

export const AuthNavbar = Template.bind({});
AuthNavbar.args = {};
AuthNavbar.decorators = [StoreDecorator({
    user: { authData: {} },
})];
AuthNavbar.parameters = {
    mockData: [
        {
            url: `${__API__}/notifications`,
            method: 'GET',
            status: 200,
            response: notifications,
        },
    ],
};
