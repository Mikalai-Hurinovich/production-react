import { useTranslation } from 'react-i18next';
import React, { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Text, TextSize } from 'shared/ui/Text/Text';
import { Select, SelectOption } from 'shared/ui/Select/Select';
import { Input } from 'shared/ui/Input/Input';
import { SortOrder } from 'shared/types/sortOrder';
import { Card } from 'shared/ui/Card/Card';
import { useSelector } from 'react-redux';
import { getArticlesSortField, getArticlesSortOrder } from '../../model/selectors/articlesSortSelectors';
import { ArticleSortFieldEnum } from '../../model/types/articlesSortField';
import styles from './ArticlesSort.module.scss';

interface ArticlesSortProps {
  className?: string;
  onArticleSortFieldChange: (value: ArticleSortFieldEnum) => void;
  sortFieldOptions: SelectOption<ArticleSortFieldEnum>[];
  onArticleSortOrderChange: (value: SortOrder) => void;
  sortOrderOptions: SelectOption<SortOrder>[];
  onSearchChange: (value: string) => void;
  search: string;
}

const ArticlesSort = (props: ArticlesSortProps) => {
    const {
        className,
        search,
        sortFieldOptions,
        sortOrderOptions,
        onSearchChange,
        onArticleSortFieldChange,
        onArticleSortOrderChange,
    } = props;
    const { t } = useTranslation();
    const sort = useSelector(getArticlesSortField);
    const sortOrder = useSelector(getArticlesSortOrder);
    return (
        <div className={classNames(styles.articlesSort, {}, [className])}>
            <Text text={t('Sort by:')} size={TextSize.L} />
            <Select onChange={onArticleSortFieldChange} options={sortFieldOptions} value={sort} />
            <Select onChange={onArticleSortOrderChange} options={sortOrderOptions} value={sortOrder} />
            <Card className={styles.search}>
                <Input
                    onChange={onSearchChange}
                    value={search}
                    placeholder={t('Search')}
                />
            </Card>
        </div>
    );
};
export default memo(ArticlesSort);
