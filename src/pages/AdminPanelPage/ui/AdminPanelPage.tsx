import React from 'react';
import { useTranslation } from 'react-i18next';
import { PageWrapper } from 'shared/ui/PageWrapper/PageWrapper';

const AdminPanelPage = () => {
    const { t } = useTranslation('about');

    return (
        <PageWrapper>
            { t('Admin Panel') }
        </PageWrapper>
    );
};

export default AdminPanelPage;
