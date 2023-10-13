import { ReactNode, useState } from 'react';
import { Listbox } from '@headlessui/react';
import { classNames } from 'shared/lib/classNames/classNames';
import styles from './ListBox.module.scss';

type optionsListDirection = 'top' | 'bottom' | 'right' | 'left';

interface ListBoxOptionProps {
  id: number,
  value: ReactNode,
  content: string,
  unavailable?: boolean,
}

interface ListBoxProps {
  options: ListBoxOptionProps[];
  onChange: (value: string) => void;
  value?: string;
  defaultValue?: string;
  className?: string;
  label?: string;
  readonly?: boolean;
  direction?: optionsListDirection;
}

function ListBox(props: ListBoxProps) {
    const {
        options,
        className,
        value,
        defaultValue,
        onChange,
        label,
        readonly = false,
        direction = 'bottom',
    } = props;

    return (
        <div className={classNames(styles.listBoxWrapper, {}, [className])}>
            {label && <h3>{label}</h3>}
            <Listbox
                as="div"
                value={value}
                onChange={onChange}
                disabled={readonly}
                className={classNames(styles.listBox, {}, [])}
            >
                <Listbox.Button className={styles.trigger}>{value ?? defaultValue}</Listbox.Button>
                <Listbox.Options className={classNames(styles.options, {}, [styles[direction]])}>
                    {options.map((option) => (
                        <Listbox.Option
                            key={option.id}
                            value={option.value}
                            disabled={option.unavailable}
                            className={({ active, selected }) => classNames(styles.option, {
                                [styles.active]: active || selected,
                                [styles.disabled]: option.unavailable,
                            })}
                        >
                            {option.content}
                        </Listbox.Option>
                    ))}
                </Listbox.Options>
            </Listbox>
        </div>
    );
}

export default ListBox;
