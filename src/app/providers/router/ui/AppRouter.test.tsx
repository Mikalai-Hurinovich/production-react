import { screen } from '@testing-library/react';
import { componentRender } from 'shared/lib/tests/componentRender/componentRender';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { UserRole } from 'entities/User/model/types/user';
import AppRouter from './AppRouter';

describe('app/router/AppRouter', () => {
    beforeEach(() => {
        // IntersectionObserver isn't available in test environment
        const mockIntersectionObserver = jest.fn();
        mockIntersectionObserver.mockReturnValue({
            observe: () => null,
            unobserve: () => null,
            disconnect: () => null,
        });
        window.IntersectionObserver = mockIntersectionObserver;
    });
    test('Страница должна отрендериться', async () => {
        componentRender(<AppRouter />, {
            route: RoutePath.about,
        });

        const page = await screen.findByTestId('AboutPage');
        expect(page).toBeInTheDocument();
    });

    test('Страница не найдена', async () => {
        componentRender(<AppRouter />, {
            route: '/awdxc',
        });

        const page = await screen.findByTestId('NotFoundPage');
        expect(page).toBeInTheDocument();
    });

    test('Редирект неавторизованного пользователя на главную', async () => {
        componentRender(<AppRouter />, {
            route: `${RoutePath.profile}1`,
        });

        const page = await screen.findByTestId('MainPage');
        expect(page).toBeInTheDocument();
    });

    test('Доступ запрещен (отсутствует роль)', async () => {
        componentRender(<AppRouter />, {
            route: RoutePath.admin_panel,
        });
        const page = await screen.findByTestId('MainPage');
        expect(page).toBeInTheDocument();
    });

    test('Доступ разрешен (присутствует роль)', async () => {
        componentRender(<AppRouter />, {
            route: RoutePath.admin_panel,
            initialState: {
                user: { _inited: true, authData: { roles: [UserRole.ADMIN] } },
            },
        });

        const page = await screen.findByTestId('AdminPanel');
        expect(page).toBeInTheDocument();
    });
    test('Доступ к закрытой страницe для авторизованного пользователя', async () => {
        componentRender(<AppRouter />, {
            route: `${RoutePath.profile}1`,
            initialState: {
                user: { _inited: true, authData: { id: '1', roles: [UserRole.ADMIN] } },
            },
        });
        const page = await screen.findByTestId('ProfilePage');
        expect(page).toBeInTheDocument();
    });
    test('Доступ к страницe cтатей для неавторизованного юзера', async () => {
        componentRender(<AppRouter />, {
            route: `${RoutePath.articles}`,
            initialState: {
                articlesPage: {
                    hasMore: false,
                    page: 1,
                    isLoading: false,
                },
            },
        });
        const page = await screen.findByTestId('MainPage');
        expect(page).toBeInTheDocument();
    });
    test('Доступ к страницe cтатей для авторизованного юзера', async () => {
        componentRender(<AppRouter />, {
            route: `${RoutePath.articles}`,
            initialState: {
                user: { _inited: true, authData: { id: '1', roles: [UserRole.ADMIN] } },
                articlesPage: {
                    hasMore: false,
                    page: 1,
                    isLoading: false,
                },
            },
        });
        const page = await screen.findByTestId('ArticlesPage');
        expect(page).toBeInTheDocument();
    });
});
