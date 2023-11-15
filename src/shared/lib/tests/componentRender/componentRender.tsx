import { ReactNode } from 'react';
import { render } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18nForTests from 'shared/config/i18n/i18nForTests';
import { MemoryRouter } from 'react-router-dom';
import { StateSchema, StoreProvider } from 'app/providers/StoreProvider';
import { ReducersMapObject } from '@reduxjs/toolkit';
import { Theme, ThemeProvider } from 'app/providers/ThemeProvider';

export interface componentRenderOptions {
  route?: string;
  initialState?: DeepPartial<StateSchema>;
  asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>;
  theme?: Theme;
}

interface GlobalProviderProps {
  options: componentRenderOptions;
  children: ReactNode;
  theme?: Theme;
}

export const GlobalProvider = ({ options, children }: GlobalProviderProps) => {
    const {
        route = '/',
        initialState,
        asyncReducers,
        theme = Theme.DARK,
    } = options;
    return (
        <MemoryRouter initialEntries={[route]}>
            <StoreProvider asyncReducers={asyncReducers} initialState={initialState}>
                <I18nextProvider i18n={i18nForTests}>
                    <ThemeProvider initialTheme={theme}>
                        <div className={`app ${theme}`}>{children}</div>
                    </ThemeProvider>
                </I18nextProvider>
            </StoreProvider>
        </MemoryRouter>
    );
};

export function componentRender(component: ReactNode, options: componentRenderOptions = {}) {
    return render(
        <GlobalProvider options={options}>
            {component}
        </GlobalProvider>,
    );
}
