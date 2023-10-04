import {
    memo, MutableRefObject, ReactNode, useRef,
} from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { useInfiniteScroll } from 'shared/lib/hooks/useInfiniteScroll/useInfiniteScroll';
import styles from './PageWrapper.module.scss';

interface PageWrapperProps {
    className?: string;
    children: ReactNode;
    onScrollEnd?: () => void;
}

export const PageWrapper = memo(({ className, children, onScrollEnd }: PageWrapperProps) => {
    const { t } = useTranslation();
    const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;
    const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
    useInfiniteScroll({ wrapperRef, triggerRef, callback: onScrollEnd });
    return (
        <section ref={wrapperRef} className={classNames(styles.pagewrapper, {}, [className])}>
            { children }
            <div ref={triggerRef} />
        </section>
    );
});
