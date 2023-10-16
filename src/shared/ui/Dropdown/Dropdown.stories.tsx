import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Button } from '../Button/Button';
import { Dropdown } from './Dropdown';

export default {
    title: 'shared/Dropdown',
    component: Dropdown,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    decorators: [
        (Story) => <div style={{ padding: '200px 0 0 200px' }}><Story /></div>,
    ],
} as ComponentMeta<typeof Dropdown>;

const items = [
    {
        disabled: false,
        content: 'Home',
        onClick: () => alert('Home!'),
        href: '/home',
    },
    {
        disabled: false,
        content: 'About',
        onClick: () => alert('About!'),
        href: '/about',
    },
    {
        disabled: true,
        content: '404',
        onClick: () => alert('404!'),
        href: '/404',
    },
];
const Template: ComponentStory<typeof Dropdown> = (args) => (
    <nav>
        <Dropdown
            {...args}
        />
    </nav>
);

export const Normal = Template.bind({});
Normal.args = {
    trigger: <Button>Open to choose</Button>,
    items,
};
export const NormalTopRight = Template.bind({});
NormalTopRight.args = {
    trigger: <Button>Open to choose</Button>,
    optionsOrientation: 'optionsTopRight',
    items,
};

export const NormalBottomRight = Template.bind({});
NormalBottomRight.args = {
    trigger: <Button>Open to choose</Button>,
    items,
    optionsOrientation: 'optionsBottomRight',
};
