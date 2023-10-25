import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { ListBox } from 'shared/ui/Popups';
import { Currency } from '../../model/types/currency';

interface CurrencySelectProps {
    className?: string;
    value?: Currency;
    onChange?: (value: Currency) => void;
    readonly?: boolean;
}

const options = [
    { id: 1, value: Currency.RUB, content: Currency.RUB },
    { id: 2, value: Currency.EUR, content: Currency.EUR },
    { id: 3, value: Currency.USD, content: Currency.USD },
];

export const CurrencySelect = memo(({
    className, value, onChange, readonly,
}: CurrencySelectProps) => {
    const { t } = useTranslation();

    const onChangeHandler = useCallback((value: string) => {
        onChange?.(value as Currency);
    }, [onChange]);

    return (
        <ListBox
            items={options}
            onChange={onChangeHandler}
            value={value}
            label={t('Укажите валюту')}
            className={className}
            readonly={readonly}
        />
    );
});
