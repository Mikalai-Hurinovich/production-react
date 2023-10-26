import { classNames } from 'shared/lib/classNames/classNames';
import React, { memo, useCallback, useState } from 'react';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Icon } from 'shared/ui/Icon/Icon';
import NotificationIcon from 'shared/assets/icons/notification-20-20.svg';
import { NotificationList } from 'entities/Notification';
import { Popover } from 'shared/ui/Popups';
import { Drawer } from 'shared/ui/Drawer/Drawer';
import {
    BrowserView, MobileView, isBrowser, isMobile,
} from 'react-device-detect';
import styles from './NotificationButton.module.scss';

interface NotificationButtonProps {
    className?: string;
}

export const NotificationButton = memo((props: NotificationButtonProps) => {
    const { className } = props;
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const handleDrawerOpen = useCallback(() => {
        setIsDrawerOpen(true);
    }, []);

    const handleDrawerClose = useCallback(() => {
        setIsDrawerOpen(false);
    }, []);

    const trigger = (
        <Button theme={ButtonTheme.CLEAR} onClick={handleDrawerOpen}>
            <Icon Svg={NotificationIcon} inverted />
        </Button>
    );
    return (
        <>
            <BrowserView>
                <Popover
                    className={classNames(styles.NotificationButton, {}, [className])}
                    direction="bottom left"
                    trigger={trigger}
                >
                    <NotificationList className={styles.notifications} />
                </Popover>
            </BrowserView>
            <MobileView>
                { trigger }
                <Drawer isOpen={isDrawerOpen} onClose={handleDrawerClose}>
                    <NotificationList className={styles.notifications} />
                </Drawer>
            </MobileView>
        </>
    );
});
