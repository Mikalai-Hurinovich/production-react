import { AxiosInstance } from 'axios';
import { CombinedState } from 'redux';
import { NavigateOptions } from 'react-router';
import { CounterSchema } from 'entities/Counter';
import { UserSchema } from 'entities/User';
import { ProfileSchema } from 'entities/Profile';
import { ArticleSchema } from 'entities/Article';
import { LoginSchema } from 'features/AuthByUsername';
import {
    AnyAction, EnhancedStore, Reducer, ReducersMapObject,
} from '@reduxjs/toolkit';
import { To } from 'history';

export interface StateSchema {
    counter: CounterSchema;
    user: UserSchema;
    // Асинхронные редюсеры
    loginForm?: LoginSchema;
    profile?: ProfileSchema;
    article?: ArticleSchema;
}

export type StateSchemaKey = keyof StateSchema;

export interface ReducerManager {
    getReducerMap: () => ReducersMapObject<StateSchema>;
    reduce: (state: StateSchema, action: AnyAction) => CombinedState<StateSchema>;
    add: (key: StateSchemaKey, reducer: Reducer) => void;
    remove: (key: StateSchemaKey) => void;
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
    reducerManager: ReducerManager;
}

export interface ThunkExtraArg {
    api: AxiosInstance;
    navigate?: (to: To, options?: NavigateOptions) => void,
}

export interface ThunkConfig<T> {
    rejectValue: T;
    extra: ThunkExtraArg;
    state: StateSchema;
}
