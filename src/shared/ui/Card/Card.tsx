import { classNames } from 'shared/lib/classNames/classNames';
import { HTMLAttributes, memo, ReactNode } from 'react';
import styles from './Card.module.scss';

export enum CardTheme {
  NORMAL = 'NORMAL',
  OUTLINED = 'OUTLINED',
}

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: ReactNode;
  theme?: CardTheme;
}

export const Card = memo((props: CardProps) => {
    const {
        className,
        children,
        theme = CardTheme.NORMAL,
        ...otherProps
    } = props;

    return (
        <div
            className={classNames(styles.card, {}, [className, styles[theme]])}
            {...otherProps}
        >
            {children}
        </div>
    );
});
