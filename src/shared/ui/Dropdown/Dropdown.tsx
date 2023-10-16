import {
    DetailedHTMLProps, Fragment, HTMLAttributes, memo, ReactNode,
} from 'react';
import { useTranslation } from 'react-i18next';
import { Menu } from '@headlessui/react';
import { classNames } from 'shared/lib/classNames/classNames';
import { AppLink } from '../AppLink/AppLink';
import styles from './Dropdown.module.scss';

interface DropdownItem {
    disabled?: boolean;
    content?: ReactNode;
    onClick?: () => void;
    href?: string;
}

type OptionsOrientation =
    'optionsBottomLeft' |
    'optionsBottomRight' |
    'optionsTopRight' |
    'optionsTopLeft';

interface DropdownProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    className?: string;
    items: DropdownItem[];
    trigger: ReactNode;
    optionsOrientation?: OptionsOrientation;
}

export const Dropdown = memo(({
    className, items, trigger, optionsOrientation = 'optionsBottomRight',
}: DropdownProps) => {
    const { t } = useTranslation();

    return (
        <Menu as="div" className={classNames(styles.dropdown, {}, [className])}>
            <Menu.Button
                className={classNames(styles.button)}
            >
                { trigger }
            </Menu.Button>
            <Menu.Items className={classNames(styles.menu, {}, [styles[optionsOrientation]])}>
                { items.map((item) => (
                    <Menu.Item as={Fragment}>
                        { ({ active }) => (
                            item.href ? (
                                <AppLink
                                    className={classNames(styles.item, {
                                        [styles.active]: active,
                                        [styles.disabled]: item.disabled,
                                    })}
                                    onClick={item.onClick}
                                    to={item.disabled ? '#' : item.href}
                                >
                                    { item?.content }
                                </AppLink>
                            ) : (
                                <li
                                    role="presentation"
                                    onClick={item.onClick}
                                    className={classNames(styles.item, {
                                        [styles.active]: active,
                                        [styles.disable]: item.disabled,
                                    })}
                                >
                                    { item?.content }
                                </li>
                            )
                        ) }
                    </Menu.Item>
                )) }

            </Menu.Items>
        </Menu>
    );
});
export default Dropdown;
