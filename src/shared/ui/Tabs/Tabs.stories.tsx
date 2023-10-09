import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { action } from '@storybook/addon-actions';
import { Tabs } from './Tabs';

export default {
    title: 'shared/Tabs',
    component: Tabs,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Tabs>;

const Template: ComponentStory<typeof Tabs> = (args) => <Tabs {...args} />;

export const Normal = Template.bind({});
Normal.args = {
    tabs: [
        {
            value: 'ECONOMICS',
            content: 'ECONOMICS',
        },
        {
            value: 'IT',
            content: 'IT',
        },
        {
            value: 'LIFE',
            content: 'LIFE',
        },
    ],
    value: 'IT',
    onTabClick: action('onTabClick'),
};
