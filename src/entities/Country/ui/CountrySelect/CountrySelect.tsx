import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Select } from 'shared/ui/Select/Select';
import { memo, useCallback } from 'react';
import ListBox from 'shared/ui/Listbox/ListBox';
import { Country } from '../../model/types/country';

interface CountrySelectProps {
  className?: string;
  value?: Country;
  onChange?: (value: Country) => void;
  readonly?: boolean;
}

const options = [
    { id: 1, value: Country.Armenia, content: Country.Armenia },
    { id: 2, value: Country.Russia, content: Country.Russia },
    { id: 3, value: Country.Belarus, content: Country.Belarus },
    { id: 4, value: Country.Kazakhstan, content: Country.Kazakhstan },
    { id: 5, value: Country.Ukraine, content: Country.Ukraine },
];

export const CountrySelect = memo(({
    className, value, onChange, readonly,
}: CountrySelectProps) => {
    const { t } = useTranslation();

    const onChangeHandler = useCallback((value: string) => {
        onChange?.(value as Country);
    }, [onChange]);

    return (
        <ListBox
            options={options}
            onChange={onChangeHandler}
            value={value}
            label={t('Укажите валюту')}
            className={className}
            readonly={readonly}
            direction="top"
        />
    );
});
