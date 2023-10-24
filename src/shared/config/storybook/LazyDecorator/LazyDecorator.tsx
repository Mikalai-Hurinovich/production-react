import { Story } from '@storybook/react';
import { Suspense } from 'react';
import { Loader } from 'shared/ui/Loader/Loader';

export const LazyDecorator = (StoryComponent: Story) => (
    <Suspense fallback={<Loader />}>
        <StoryComponent />
    </Suspense>
);
