import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import React, { memo, useCallback, useState } from 'react';
import { LoginModal } from 'features/AuthByUsername';
import { useDispatch, useSelector } from 'react-redux';
import {
    getUserAuthData, isAdmin, isManager, userActions,
} from 'entities/User';
import { Dropdown } from 'shared/ui/Popups';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { NotificationButton } from 'features/notificationButton';
import styles from './Navbar.module.scss';

interface NavbarProps {
    className?: string;
}

export const Navbar = memo(({ className }: NavbarProps) => {
    const { t } = useTranslation();
    const [isAuthModal, setIsAuthModal] = useState(false);
    const authData = useSelector(getUserAuthData);
    const hasAdminRole = useSelector(isAdmin);
    const hasManagerRole = useSelector(isManager);
    const isAdminPanelVisible = hasAdminRole || hasManagerRole;
    const dispatch = useDispatch();
    const onCloseModal = useCallback(() => {
        setIsAuthModal(false);
    }, []);

    const onShowModal = useCallback(() => {
        setIsAuthModal(true);
    }, []);

    const onLogout = useCallback(() => {
        dispatch(userActions.logout());
    }, [dispatch]);

    if (authData) {
        return (
            <nav className={classNames(styles.Navbar, {}, [className])}>
                <div className={styles.links}>
                    <NotificationButton />
                    <Dropdown
                        direction="bottom left"
                        className={styles.dropdown}
                        items={[
                            {
                                content: t('Профиль'),
                                href: RoutePath.profile + authData.id,
                            },
                            ...(isAdminPanelVisible ? [{
                                content: t('Панель Админа'),
                                href: RoutePath.admin_panel,
                            }] : []),
                            {
                                content: t('Выйти'),
                                onClick: onLogout,
                            },
                        ]}
                        trigger={<Avatar size={35} src={authData.avatar} />}
                    />
                </div>
            </nav>
        );
    }

    return (
        <nav className={classNames(styles.Navbar, {}, [className])}>
            <div className={styles.links}>
                <Dropdown
                    direction="bottom left"
                    className={styles.dropdown}
                    items={[
                        {
                            content: t('Войти'),
                            onClick: onShowModal,
                        },
                    ]}
                    trigger={<Avatar size={35} />}
                />
                { isAuthModal && (
                    <LoginModal
                        isOpen={isAuthModal}
                        onClose={onCloseModal}
                    />
                ) }
            </div>
        </nav>
    );
});
