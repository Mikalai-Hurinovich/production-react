import { Fragment, ReactNode } from 'react';
import { Listbox as HListBox } from '@headlessui/react';
import { classNames } from 'shared/lib/classNames/classNames';
import { DropdownDirection } from 'shared/types/ui';
import { Button } from '../../../Button/Button';
import styles from './ListBox.module.scss';
import { mapDirectionClass } from '../../styles/consts';
import popupstyles from '../../styles/popup.module.scss';

export interface ListBoxItem {
    value: string;
    content: ReactNode;
    disabled?: boolean;
}

interface ListBoxProps {
    items?: ListBoxItem[];
    className?: string;
    value?: string;
    defaultValue?: string;
    onChange: (value: string) => void;
    readonly?: boolean;
    direction?: DropdownDirection;
    label?: string;
}

export function ListBox(props: ListBoxProps) {
    const {
        className,
        items,
        value,
        defaultValue,
        onChange,
        readonly = false,
        direction = 'bottom right',
        label,
    } = props;

    const optionsClasses = [mapDirectionClass[direction]];

    return (
        <div className={styles.wrapper}>
            { label && <span>{ `${label}>` }</span> }
            <HListBox
                disabled={readonly}
                as="div"
                className={classNames(styles.ListBox, {}, [className, popupstyles.popup])}
                value={value}
                onChange={onChange}
            >
                <HListBox.Button className={styles.trigger}>
                    <Button disabled={readonly}>
                        { value ?? defaultValue }
                    </Button>
                </HListBox.Button>
                <HListBox.Options className={classNames(styles.options, {}, optionsClasses)}>
                    { items?.map((item) => (
                        <HListBox.Option
                            key={item.value}
                            value={item.value}
                            disabled={item.disabled}
                            as={Fragment}
                        >
                            { ({ active, selected }) => (
                                <li
                                    className={classNames(
                                        styles.item,
                                        {
                                            [popupstyles.active]: active,
                                            [popupstyles.disabled]: item.disabled,
                                        },
                                    )}
                                >
                                    {/* eslint-disable-next-line i18next/no-literal-string */ }
                                    { selected && <span className={styles.active}>&#8902;</span> }
                                    { item.content }
                                </li>
                            ) }
                        </HListBox.Option>
                    )) }
                </HListBox.Options>
            </HListBox>
        </div>
    );
}
