import { Menu } from '@headlessui/react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Fragment, ReactNode } from 'react';
import { DropdownDirection } from 'shared/types/ui';
import { AppLink } from '../../../AppLink/AppLink';
import styles from './Dropdown.module.scss';
import { mapDirectionClass } from '../../styles/consts';
import popupstyles from '../../styles/popup.module.scss';

export interface DropdownItem {
    disabled?: boolean;
    content?: ReactNode;
    onClick?: () => void;
    href?: string;
}

interface DropdownProps {
    className?: string;
    items: DropdownItem[];
    direction?: DropdownDirection;
    trigger: ReactNode;
}

export function Dropdown(props: DropdownProps) {
    const {
        className, trigger, items, direction = 'bottom right',
    } = props;

    const menuClasses = [mapDirectionClass[direction]];

    return (
        <Menu as="div" className={classNames(styles.Dropdown, {}, [className, popupstyles.popup])}>
            <Menu.Button className={popupstyles.trigger}>
                { trigger }
            </Menu.Button>
            <Menu.Items className={classNames(styles.menu, {}, menuClasses)}>
                { items.map((item) => {
                    const content = ({ active }: { active: boolean }) => (
                        <button
                            type="button"
                            disabled={item.disabled}
                            onClick={item.onClick}
                            className={classNames(styles.item, { [popupstyles.active]: active })}
                        >
                            { item.content }
                        </button>
                    );

                    if (item.href) {
                        return (
                            <Menu.Item key={Math.random()} as={AppLink} to={item.href} disabled={item.disabled}>
                                { content }
                            </Menu.Item>
                        );
                    }

                    return (
                        <Menu.Item key={Math.random()} as={Fragment} disabled={item.disabled}>
                            { content }
                        </Menu.Item>
                    );
                }) }

            </Menu.Items>
        </Menu>
    );
}
