import {
    memo, MutableRefObject, ReactNode, UIEvent, useRef,
} from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { useInfiniteScroll } from 'shared/lib/hooks/useInfiniteScroll/useInfiniteScroll';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getScrollSaveByPath, scrollSaveActions } from 'features/ScrollSave';
import { useLocation } from 'react-router-dom';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useSelector } from 'react-redux';
import { useThrottle } from 'shared/lib/hooks/useThrottle/useThrottle';
import { StateSchema } from 'app/providers/StoreProvider';
import styles from './PageWrapper.module.scss';

interface PageWrapperProps {
  children: ReactNode;
  className?: string;
  onScrollEnd?: () => void;
  scrollSaveEnabled?: boolean;
}

export const PageWrapper = memo(({
    className, children, onScrollEnd, scrollSaveEnabled = false,
}: PageWrapperProps) => {
    const { t } = useTranslation();
    const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;
    const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
    useInfiniteScroll({ wrapperRef, triggerRef, callback: onScrollEnd });
    const dispatch = useAppDispatch();
    const location = useLocation();
    const scrollPosition = useSelector((state: StateSchema) => getScrollSaveByPath(state, location.pathname));
    useInitialEffect(() => {
        wrapperRef.current.scrollTop = scrollPosition;
    });

    const handleScroll = useThrottle((e: UIEvent<HTMLDivElement>) => {
        dispatch(scrollSaveActions.setScrollPosition(
            {
                position: e.currentTarget.scrollTop,
                path: location.pathname,
            },
        ));
    }, 300);

    const scrollHandler = scrollSaveEnabled ? handleScroll : () => {
    };

    return (
        <section
            onScroll={scrollHandler}
            ref={wrapperRef}
            className={classNames(styles.pagewrapper, {}, [className])}
        >
            {children}
            {onScrollEnd && <div ref={triggerRef} className={styles.scrollTrigger} />}
        </section>
    );
});
