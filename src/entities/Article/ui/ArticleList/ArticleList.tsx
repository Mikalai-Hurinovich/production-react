import {
    DetailedHTMLProps, HTMLAttributeAnchorTarget, HTMLAttributes, memo,
} from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { ArticleViewEnum, IArticle } from '../../model/types/article';
import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import styles from './ArticleList.module.scss';

interface ArticleListProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    articles: IArticle[];
    className?: string;
    isLoading?: boolean;
    target?: HTMLAttributeAnchorTarget;
    view?: ArticleViewEnum;
}

export const ArticleList = memo((props: ArticleListProps) => {
    const {
        className,
        view = ArticleViewEnum.PLATE,
        isLoading,
        articles,
        target = '_self',
    } = props;
    const { t } = useTranslation();

    function renderArticle(article: IArticle) {
        return (
            <ArticleListItem
                target={target}
                className={styles.card}
                key={article.id}
                article={article}
                view={view}
            />
        );
    }

    if (!isLoading && !articles?.length) {
        return (
            <div className={classNames(styles.articleList, {}, [className])}>
                { t('Ничего не найдено') }
            </div>
        );
    }

    return (
        <div className={classNames(styles.articleList, {}, [className])}>
            { articles?.length
                ? articles.map(renderArticle)
                : null }
            { isLoading && (
                <div className={classNames(styles.articleList, {}, [className])}>
                    { new Array(view === ArticleViewEnum.PLATE ? 4 : 6)
                        .fill(<ArticleListItemSkeleton view={view} />)
                        .map(((a, i) => ({ ...a, id: i, key: i }))) }
                </div>
            ) }
        </div>
    );
});
