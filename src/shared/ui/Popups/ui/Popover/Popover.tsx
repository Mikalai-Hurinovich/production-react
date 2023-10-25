import { classNames } from 'shared/lib/classNames/classNames';
import { Popover as HPopover } from '@headlessui/react';
import { ReactNode } from 'react';
import { DropdownDirection } from 'shared/types/ui';
import { mapDirectionClass } from '../../styles/consts';
import styles from './Popover.module.scss';
import popupstyles from '../../styles/popup.module.scss';

interface PopoverProps {
    className?: string;
    direction?: DropdownDirection;
    trigger: ReactNode;
    children: ReactNode;
}

export function Popover(props: PopoverProps) {
    const {
        className, trigger, direction = 'bottom right', children,
    } = props;

    const menuClasses = [mapDirectionClass[direction]];

    return (
        <HPopover
            className={classNames(styles.Popover, {}, [className, popupstyles.popup])}
        >
            <HPopover.Button className={popupstyles.trigger}>
                { trigger }
            </HPopover.Button>

            <HPopover.Panel
                className={classNames(styles.panel, {}, menuClasses)}
            >
                { children }
            </HPopover.Panel>
        </HPopover>
    );
}
