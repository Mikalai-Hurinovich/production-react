import {
    DetailedHTMLProps, HTMLAttributes, memo, useCallback,
} from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { CommentList } from 'entities/Comment';
import { Text } from 'shared/ui/Text/Text';
import { AddCommentForm } from 'features/addCommentForm';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { addArticleComment } from 'pages/ArticleDetailsPage';
import { useTranslation } from 'react-i18next';
import styles from './ArticleCommentsList.module.scss';
import { useArticleCommentsList } from '../../api/aritcleCommentsApi';

interface ArticleCommentsListProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    articleId: string;
    className?: string;
}

export const ArticleCommentsList = memo(({ articleId, className }: ArticleCommentsListProps) => {
    const { isLoading, data: comments } = useArticleCommentsList(articleId);
    const { t } = useTranslation('article');
    const dispatch = useAppDispatch();
    const handleSendComment = useCallback((text: string) => {
        dispatch(addArticleComment(text));
    }, [dispatch]);
    return (
        <div className={classNames(styles.articlecommentslist, {}, [className])}>
            <Text className={styles.commentsTitle} title={t('Комментарии')} />
            <AddCommentForm onSendComment={handleSendComment} />
            <CommentList
                isLoading={isLoading}
                comments={comments}
            />
        </div>
    );
});
