import React from 'react';
import { useTranslation } from 'react-i18next';
import { PageWrapper } from 'shared/ui/PageWrapper/PageWrapper';

const AboutPage = () => {
    const { t } = useTranslation('about');

    return (
        <PageWrapper data-testid="AboutPage">
            { t('О сайте') }
        </PageWrapper>
    );
};

export default AboutPage;
