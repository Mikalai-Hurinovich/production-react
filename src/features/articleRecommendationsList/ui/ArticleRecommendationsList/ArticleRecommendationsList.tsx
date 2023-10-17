import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { Text } from 'shared/ui/Text/Text';
import { ArticleList, ArticleViewEnum } from 'entities/Article';
import styles from './ArticleRecommendationsList.module.scss';
import { useArticleRecommendationsList } from '../../api/aritcleRecommendationsApi';

interface ArticleRecommendationsListProps {
    className?: string;
}

export const ArticleRecommendationsList = memo((props: ArticleRecommendationsListProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const { isLoading: recommendationsIsLoading, data: recommendations } = useArticleRecommendationsList(4);

    return (
        <div className={classNames(styles.articleRecommendationsList, {}, [className])}>
            <Text title={t('Рекоммендации')} className={styles.recommendationsTitle} />
            <ArticleList
                articles={recommendations}
                isLoading={recommendationsIsLoading}
                view={ArticleViewEnum.LIST}
                className={styles.recommendationsList}
                target="_blank"
            />
        </div>
    );
});
