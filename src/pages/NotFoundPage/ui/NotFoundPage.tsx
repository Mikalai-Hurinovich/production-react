import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { PageWrapper } from 'shared/ui/PageWrapper/PageWrapper';
import styles from './NotFoundPage.module.scss';

interface NotFoundPageProps {
    className?: string;
}

export const NotFoundPage = ({ className }: NotFoundPageProps) => {
    const { t } = useTranslation();
    return (
        <PageWrapper data-testid="NotFoundPage" className={classNames(styles.NotFoundPage, {}, [className])}>
            { t('Страница не найдена') }
        </PageWrapper>
    );
};
