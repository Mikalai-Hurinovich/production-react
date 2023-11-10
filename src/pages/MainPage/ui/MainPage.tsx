import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PageWrapper } from 'shared/ui/PageWrapper/PageWrapper';

const MainPage = () => {
    const { t } = useTranslation();
    const [value, setValue] = useState('');

    const onChange = (val: string) => {
        setValue(val);
    };

    return (
        <PageWrapper data-testid="MainPage">
            { t('Главная страница') }
        </PageWrapper>
    );
};

export default MainPage;
