import { classNames, Mods } from 'shared/lib/classNames/classNames';
import React, {
    MutableRefObject, ReactNode, useCallback, useEffect, useRef, useState,
} from 'react';
import { useTheme } from 'app/providers/ThemeProvider';
import { useModal } from 'shared/lib/hooks/useModal/useModal';
import { Overlay } from '../Overlay/Overlay';
import { Portal } from '../Portal/Portal';
import styles from './Modal.module.scss';

interface ModalProps {
    className?: string;
    children?: ReactNode;
    isOpen?: boolean;
    onClose?: () => void;
    lazy?: boolean;
}

const ANIMATION_DELAY = 300;

export const Modal = (props: ModalProps) => {
    const {
        className,
        children,
        isOpen,
        onClose,
        lazy,
    } = props;

    const { isMounted, isClosing, close } = useModal({ animationDelay: 300, isOpen, onClose });

    const { theme } = useTheme();

    const onContentClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    const mods: Mods = {
        [styles.opened]: isOpen,
        [styles.isClosing]: isClosing,
    };

    if (lazy && !isMounted) {
        return null;
    }

    return (
        <Portal>
            <div className={classNames(styles.Modal, mods, [className, theme, 'app_modal'])}>
                <Overlay onClick={onClose} />
                <div className={styles.overlay} onClick={close}>
                    <div
                        className={styles.content}
                        onClick={onContentClick}
                    >
                        { children }
                    </div>
                </div>
            </div>
        </Portal>
    );
};
