import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { ArticleDetails } from 'entities/Article';
import { useNavigate, useParams } from 'react-router-dom';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { Button } from 'shared/ui/Button/Button';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { PageWrapper } from 'shared/ui/PageWrapper/PageWrapper';
import { ArticleRecommendationsList } from 'features/articleRecommendationsList';
import { ArticleCommentsList } from 'features/articleCommentsList/ui/articleCommentsList/ArticleCommentsList';
import { ArticleRating } from 'features/articleRating';
import { articleDetailsPageReducer } from '../../model/slices';
import styles from './ArticleDetailsPage.module.scss';

interface ArticleDetailsPageProps {
    className?: string;
    customId?: string;
}

const reducersList: ReducersList = {
    articleDetailsPage: articleDetailsPageReducer,
};

const ArticleDetailsPage = (props: ArticleDetailsPageProps) => {
    const { className, customId } = props;
    const { t } = useTranslation('article');
    const params = useParams<{ id: string }>();
    const navigate = useNavigate();
    const articleId = params?.id ?? customId;
    const handleBackClick = useCallback(() => {
        navigate(RoutePath.articles);
    }, [navigate]);

    if (!articleId) {
        return (
            <PageWrapper className={classNames(styles.ArticleDetailsPage, {}, [className])}>
                { t('Статья не найдена') }
            </PageWrapper>
        );
    }

    return (
        <DynamicModuleLoader reducers={reducersList} removeAfterUnmount>
            <PageWrapper className={classNames(styles.ArticleDetailsPage, {}, [className])}>
                <Button onClick={handleBackClick}>{ t('Назад') }</Button>
                <ArticleDetails id={articleId} />
                <ArticleRating id={articleId} />
                <ArticleRecommendationsList />
                <ArticleCommentsList articleId={articleId} />
            </PageWrapper>
        </DynamicModuleLoader>
    );
};

export default memo(ArticleDetailsPage);
