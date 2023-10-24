import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { ArticleList } from 'entities/Article';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { PageWrapper } from 'shared/ui/PageWrapper/PageWrapper';
import { ArticleSortFieldEnum, articlesSortActions, articlesSortReducer } from 'features/articlesSort';
import { ArticlesFilters } from 'entities/Article/ui/ArticlesFilters/ArticlesFilters';
import { useSearchParams } from 'react-router-dom';
import { SortOrder } from 'shared/types/sortOrder';
import { ArticleType } from 'entities/Article/model/types/article';
import { fetchNextArticlesPage } from '../../model/services/fetchNextArticles/fetchNextArticlesPage';
import {
    getArticlesPageInited,
    getArticlesPageIsLoading,
    getArticlesPageView,
} from '../../model/selectors/articlesPageSelectors';
import { articlesPageActions, articlesPageReducer, getArticles } from '../../model/slices/articlesPageSlice';
import { fetchArticles } from '../../model/services/fetchArticles/fetchArticles';
import styles from './ArticlesPage.module.scss';

interface ArticlesPageProps {
    className?: string;
}

const reducers: ReducersList = {
    articlesPage: articlesPageReducer,
    articlesSort: articlesSortReducer,
};
const ArticlesPage = (props: ArticlesPageProps) => {
    const { className } = props;
    const { t } = useTranslation();

    const dispatch = useAppDispatch();
    const articles = useSelector(getArticles.selectAll);
    const view = useSelector(getArticlesPageView);
    const isLoading = useSelector(getArticlesPageIsLoading);
    const isInited = useSelector(getArticlesPageInited);
    const [searchParams] = useSearchParams();
    const onNextArticlePartLoad = useCallback(() => {
        dispatch(fetchNextArticlesPage());
        // eslint-disable-next-line
    }, [ dispatch, isLoading ]);
    const initArticlesData = () => {
        if (!isInited) {
            dispatch(articlesPageActions.initPage());

            const orderValue = searchParams.get('order');
            const searchValue = searchParams.get('search');
            const sortValue = searchParams.get('sort');
            const type = searchParams.get('type') as ArticleType;
            if (orderValue) {
                dispatch(articlesSortActions.setOrder(orderValue as SortOrder));
            }
            if (searchValue) {
                dispatch(articlesSortActions.setSearch(searchValue));
            }
            if (sortValue) {
                dispatch(articlesSortActions.setSortField(sortValue as ArticleSortFieldEnum));
            }
            if (type) {
                dispatch(articlesSortActions.setType(type));
            }
            dispatch(fetchArticles({}));
        }
    };
    useInitialEffect(() => {
        initArticlesData();
    }, []);

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
            <PageWrapper
                onScrollEnd={onNextArticlePartLoad}
                className={classNames(styles.ArticlesPage, {}, [className])}
                scrollSaveEnabled
            >
                <ArticlesFilters />
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
