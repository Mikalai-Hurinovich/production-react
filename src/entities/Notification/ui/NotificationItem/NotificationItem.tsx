import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { Card, CardTheme } from 'shared/ui/Card/Card';
import { Text } from 'shared/ui/Text/Text';
import styles from './NotificationItem.module.scss';
import { INotification } from '../../model/types/notification';

interface NotificationItemProps {
    className?: string;
    item: INotification;
}

export const NotificationItem = memo((props: NotificationItemProps) => {
    const { className, item } = props;

    const content = (
        <Card
            theme={CardTheme.OUTLINED}
            className={classNames(styles.NotificationItem, {}, [className])}
        >
            <Text title={item.title} text={item.description} />
        </Card>
    );

    if (item.href) {
        return (
            <a className={styles.link} target="_blank" href={item.href} rel="noreferrer">
                { content }
            </a>
        );
    }

    return content;
});
