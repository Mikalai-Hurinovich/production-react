import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Rating } from './Rating';

export default {
    title: 'shared/Rating',
    component: Rating,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Rating>;

const Template: ComponentStory<typeof Rating> = (args) => <Rating {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
