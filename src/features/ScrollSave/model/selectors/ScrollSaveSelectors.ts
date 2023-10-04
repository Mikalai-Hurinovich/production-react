import { StateSchema } from 'app/providers/StoreProvider';
import { createSelector } from '@reduxjs/toolkit';

const scrollSavePosition = (state: StateSchema) => state.scrollSave.scroll;

export const getScrollSaveByPath = createSelector(
    scrollSavePosition,
    (state: StateSchema, path: string) => path,
    (scroll, path) => scroll[path] || 0,
);
