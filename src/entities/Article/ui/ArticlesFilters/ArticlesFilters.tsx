import {
    DetailedHTMLProps, FC, HTMLAttributes, useCallback, useMemo,
} from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import ArticlesSort from 'features/articlesSort/ui/articlesSort/ArticlesSort';
import { ArticlesViewSwitcher } from 'features/articlesViewSwitcher/ui/ArticlesViewSwitcher';
import { useSelector } from 'react-redux';
import {
    ArticleSortFieldEnum, articlesSortActions, getArticlesSortSearch, getArticlesSortType,
} from 'features/articlesSort';
import { SelectOption } from 'shared/ui/Select/Select';
import { SortOrder } from 'shared/types/sortOrder';
import { articlesPageActions, fetchArticles, getArticlesPageView } from 'pages/ArticlesPage';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import useDebounce from 'shared/lib/hooks/useDebounce/useDebounce';
import { TabItem, Tabs } from 'shared/ui/Tabs/Tabs';
import { ArticleType, ArticleViewEnum } from '../../model/types/article';
import styles from './ArticlesFilters.module.scss';

interface ArticlesFiltersProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  className?: string;
}

export const ArticlesFilters: FC<ArticlesFiltersProps> = ({ className }) => {
    const { t } = useTranslation();
    const search = useSelector(getArticlesSortSearch);
    const type = useSelector(getArticlesSortType);
    const dispatch = useAppDispatch();
    const view = useSelector(getArticlesPageView);
    const fetchFilteredData = useCallback(() => {
        dispatch(fetchArticles({ replace: true }));
    }, [dispatch]);
    const debouncedFetchFilteredData = useDebounce(fetchFilteredData, 500);
    const sortFieldOptions: SelectOption<ArticleSortFieldEnum>[] = useMemo(() => [
        { value: ArticleSortFieldEnum.CREATED, content: t('Created') },
        { value: ArticleSortFieldEnum.TITLE, content: t('Title') },
        { value: ArticleSortFieldEnum.VIEWS, content: t('Views') },
    ], [t]);

    const sortOrderOptions: SelectOption<SortOrder>[] = useMemo(() => [
        { value: 'asc', content: 'A-Z' },
        { value: 'desc', content: 'Z-A' },
    ], []);
    const articlesTypes = useMemo(() => Object.keys(ArticleType)
        .map((type) => ({
            value: type as ArticleType,
            content: t(type),
        })), [t]);

    const onArticleSortFieldChange = useCallback((field) => {
        dispatch(articlesSortActions.setSortField(field));
        dispatch(articlesPageActions.setPage(1));
        debouncedFetchFilteredData();
    }, [dispatch, debouncedFetchFilteredData]);

    const onArticleSortOrderChange = useCallback((value) => {
        dispatch(articlesSortActions.setOrder(value));
        dispatch(articlesPageActions.setPage(1));
        debouncedFetchFilteredData();
    }, [dispatch, debouncedFetchFilteredData]);

    const onSearchChange = useCallback((searchTerm) => {
        dispatch(articlesSortActions.setSearch(searchTerm));
        dispatch(articlesPageActions.setPage(1));
        debouncedFetchFilteredData();
    }, [dispatch, debouncedFetchFilteredData]);

    const handleViewClick = useCallback((currentView: ArticleViewEnum) => {
        dispatch(articlesPageActions.setView(currentView));
    }, [dispatch]);

    const handleTypeChange = useCallback((tab: TabItem<ArticleType>) => {
        dispatch(articlesSortActions.setType(tab.value));
        dispatch(articlesPageActions.setPage(1));
        debouncedFetchFilteredData();
    }, [dispatch, debouncedFetchFilteredData]);

    return (
        <>
            <div className={classNames(styles.articlesfilters, {}, [className])}>
                <ArticlesSort
                    onArticleSortFieldChange={onArticleSortFieldChange}
                    onArticleSortOrderChange={onArticleSortOrderChange}
                    onSearchChange={onSearchChange}
                    sortFieldOptions={sortFieldOptions}
                    search={search}
                    sortOrderOptions={sortOrderOptions}
                />
                <ArticlesViewSwitcher onViewItemClick={handleViewClick} view={view!} />
            </div>
            <Tabs<ArticleType> tabs={articlesTypes} value={type} onTabClick={handleTypeChange} />
        </>
    );
};
