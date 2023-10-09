import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { ArticleDetails, ArticleList, ArticleViewEnum } from 'entities/Article';
import { useNavigate, useParams } from 'react-router-dom';
import { Text } from 'shared/ui/Text/Text';
import { CommentList } from 'entities/Comment';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useSelector } from 'react-redux';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { AddCommentForm } from 'features/addCommentForm';
import { Button } from 'shared/ui/Button/Button';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { PageWrapper } from 'shared/ui/PageWrapper/PageWrapper';
import { getArticleRecommendations } from 'pages/ArticleDetailsPage/model/slices/articleDetailsRecomendationsSlice';
import { getArticleDetailsRecommendationsIsLoading } from 'pages/ArticleDetailsPage';
import { fetchArticleRecommendations } from 'pages/ArticleDetailsPage/model/services/fetchArticleRecommendations/fetchArticleRecommendations';
import { articleDetailsPageReducer } from '../../model/slices';
import { fetchCommentsByArticleId } from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { addArticleComment } from '../../model/services/addArticleComment/addArticleComment';
import styles from './ArticleDetailsPage.module.scss';
import { getArticleComments } from '../../model/slices/articleDetailsCommentsSlice';
import { getArticleCommentsIsLoading } from '../../model/selectors/commentsSelectors';

interface ArticleDetailsPageProps {
  className?: string;
}

const reducersList: ReducersList = {
    articleDetailsPage: articleDetailsPageReducer,
};

const ArticleDetailsPage = (props: ArticleDetailsPageProps) => {
    const { className } = props;
    const { t } = useTranslation('article');
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const comments = useSelector(getArticleComments.selectAll);
    const commentsIsLoading = useSelector(getArticleCommentsIsLoading);
    const navigate = useNavigate();
    const recommendations = useSelector(getArticleRecommendations.selectAll);
    const recommendationsIsLoading = useSelector(getArticleDetailsRecommendationsIsLoading);

    useInitialEffect(() => {
        dispatch(fetchCommentsByArticleId(id));
    }, [dispatch]);

    useInitialEffect(() => {
        dispatch(fetchArticleRecommendations());
    }, [dispatch]);

    const handleSendComment = useCallback((text) => {
        dispatch(addArticleComment(text));
    }, [dispatch]);

    const handleBackClick = useCallback(() => {
        navigate(RoutePath.articles);
    }, [navigate]);

    if (!id) {
        return (
            <PageWrapper className={classNames(styles.ArticleDetailsPage, {}, [className])}>
                {t('Статья не найдена')}
            </PageWrapper>
        );
    }

    return (
        <DynamicModuleLoader reducers={reducersList} removeAfterUnmount>
            <PageWrapper className={classNames(styles.ArticleDetailsPage, {}, [className])}>
                <Button onClick={handleBackClick}>{t('Назад')}</Button>
                <ArticleDetails id={id} />
                <Text title={t('Рекоммендации')} className={styles.recommendationsTitle} />
                <ArticleList
                    articles={recommendations}
                    isLoading={recommendationsIsLoading}
                    view={ArticleViewEnum.LIST}
                    className={styles.recommendationsList}
                    target="_blank"
                />
                <Text className={styles.commentsTitle} title={t('Комментарии')} />
                <AddCommentForm onSendComment={handleSendComment} />
                <CommentList
                    isLoading={commentsIsLoading}
                    comments={comments}
                />
            </PageWrapper>
        </DynamicModuleLoader>
    );
};

export default memo(ArticleDetailsPage);
