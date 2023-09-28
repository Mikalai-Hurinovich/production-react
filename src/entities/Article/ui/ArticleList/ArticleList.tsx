import { DetailedHTMLProps, HTMLAttributes, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { ArticleListItemSkeleton } from 'entities/Article';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import { ArticleViewEnum, IArticle } from '../../model/types/article';
import styles from './ArticleList.module.scss';

interface ArticleListProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    articles: IArticle[];
    className?: string;
    isLoading?: boolean;
    view?: ArticleViewEnum;
}

export const ArticleList = memo((props: ArticleListProps) => {
    const {
        className,
        view = ArticleViewEnum.PLATE,
        isLoading,
        articles,
    } = props;
    const { t } = useTranslation();

    function renderArticle(article: IArticle) {
        return <ArticleListItem className={styles.card} key={article.id} article={article} view={view} />;
    }

    if (isLoading) {
        return (
            <div className={classNames(styles.articleList, {}, [className])}>
                { new Array(view === ArticleViewEnum.PLATE ? 3 : 6)
                    .fill(<ArticleListItemSkeleton view={view} />)
                    .map(((a, i) => ({ ...a, id: i, key: i }))) }
            </div>
        );
    }
    return (
        <div className={classNames(styles.articleList, {}, [className])}>
            { articles.length
                ? articles.map(renderArticle)
                : null }
        </div>
    );
});
