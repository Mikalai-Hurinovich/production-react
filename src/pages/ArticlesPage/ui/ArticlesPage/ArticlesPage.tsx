import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { ArticleList, ArticleViewEnum } from 'entities/Article';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { ArticlesViewSwitcher } from 'features/articlesViewSwitcher/ui/ArticlesViewSwitcher';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { PageWrapper } from 'shared/ui/PageWrapper/PageWrapper';
import { fetchNextArticlesPage } from '../../model/services/fetchNextArticles/fetchNextArticlesPage';
import {
    getArticlesPageInited,
    getArticlesPageIsLoading,
    getArticlesPageView,
} from '../../model/selectors/articlesPageSelectors';
import { articlesPageActions, articlesPageReducer, getArticles } from '../../model/slices/articlesPageSlice';
import { fetchArticles } from '../../model/services/fetchArticles/fetchArticles';
import cls from './ArticlesPage.module.scss';

interface ArticlesPageProps {
    className?: string;
}

const reducers: ReducersList = {
    articlesPage: articlesPageReducer,
};
const ArticlesPage = (props: ArticlesPageProps) => {
    const { className } = props;
    const { t } = useTranslation();

    const dispatch = useAppDispatch();
    const articles = useSelector(getArticles.selectAll);
    const view = useSelector(getArticlesPageView);
    const isLoading = useSelector(getArticlesPageIsLoading);
    const isInited = useSelector(getArticlesPageInited);
    const handleViewClick = useCallback((currentView: ArticleViewEnum) => {
        dispatch(articlesPageActions.setView(currentView));
    }, [dispatch]);

    const onNextArticlePartLoad = useCallback(() => {
        dispatch(fetchNextArticlesPage());
        // eslint-disable-next-line
    }, [ dispatch, isLoading ]);

    useInitialEffect(() => {
        if (!isInited) {
            dispatch(articlesPageActions.initPage());
            dispatch(fetchArticles({
                page: 1,
            }));
        }
    }, []);
    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
            <PageWrapper
                onScrollEnd={onNextArticlePartLoad}
                className={classNames(cls.ArticlesPage, {}, [className])}
            >
                <ArticlesViewSwitcher onViewItemClick={handleViewClick} view={view!} />
                <ArticleList
                    articles={articles}
                    view={view}
                    isLoading={isLoading}
                />
            </PageWrapper>
        </DynamicModuleLoader>
    );
};
export default memo(ArticlesPage);
