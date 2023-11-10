import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Skeleton } from '../Skeleton/Skeleton';
import { LazyImage } from './LazyImage';

export default {
    title: 'shared/LazyImage',
    component: LazyImage,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof LazyImage>;

const Template: ComponentStory<typeof LazyImage> = (args) => (
    <LazyImage
        {...args}
        style={{
            width: '200px',
            height: '200px',
        }}
    />
);

export const Normal = Template.bind({});
Normal.args = {
    src: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
    fallback: <Skeleton width="200" height="200" />,
};
