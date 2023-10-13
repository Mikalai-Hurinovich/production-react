import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import ListBox from './ListBox';

export default {
    title: 'shared/ListBox',
    component: ListBox,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ListBox>;

const Template: ComponentStory<typeof ListBox> = (args) => (
    <div
        style={{
            height: '100vh', alignItems: 'center', justifyContent: 'center', display: 'flex',
        }}
    >
        <ListBox {...args} />
    </div
    >
);
const options = [
    {
        id: 1, value: 'Durward Reynolds', unavailable: false, content: 'Durward Reynolds',
    },
    {
        id: 2, value: 'Kenton Towne', unavailable: false, content: 'Kenton Towne',
    },
    {
        id: 3, value: 'T', unavailable: false, content: 'T',
    },
    {
        id: 4, value: 'Benedict Kessler', unavailable: true, content: 'Benedict Kessler',
    },
    {
        id: 5, value: 'Katelyn Rohan', unavailable: false, content: 'Katelyn Rohan',
    },
];
export const Primary = Template.bind({});
Primary.args = {
    label: 'Label',
    options,
    onChange: () => {
    },
    defaultValue: 'Durward Reynolds',
};
export const DarkTop = Template.bind({});
DarkTop.args = {
    label: 'Label',
    options,
    onChange: () => {
    },
    direction: 'top',
    defaultValue: 'Durward Reynolds',
};
DarkTop.decorators = [ThemeDecorator(Theme.DARK)];
