import {
    memo, DetailedHTMLProps, FC, HTMLAttributes, useMemo,
} from 'react';

import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Rating } from 'shared/ui/Rating/Rating';
import { Text } from 'shared/ui/Text/Text';
import { Loader } from 'shared/ui/Loader/Loader';
import { useSelector } from 'react-redux';
import { getUserAuthData } from 'entities/User';
import { toast } from 'react-toastify';
import { useArticleRating, useArticleRatingByUserId, usePostArticleRating } from '../api/articleRatingApi';
import styles from './ArticleRating.module.scss';
import { IArticleRating } from '../model/types';

interface ArticleRatingProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    className?: string;
    id: string;
}

export const ArticleRating = memo(({ className, id }: ArticleRatingProps) => {
    const { t } = useTranslation();
    const { isLoading, data: ratings } = useArticleRating(id);
    const [postRating] = usePostArticleRating();
    const authData = useSelector(getUserAuthData);
    const { data: userRatings } = useArticleRatingByUserId({ articleId: id, userId: authData?.id ?? '' });
    const hasVoted = Boolean(userRatings?.length);
    const handleSubmit = (rating: number) => {
        if (authData?.id) {
            if (hasVoted) {
                toast.error('You\'ve already voted');
                return;
            }
            postRating({ articleId: id, rating, userId: authData.id });
        }
    };

    const calculatedRating = useMemo(() => {
        if (!ratings?.length) return 0;
        const sum = ratings.reduce((acc: number, item: IArticleRating) => acc + item.value, 0);
        return Math.round(sum / ratings.length);
    }, [ratings]);

    if (isLoading) {
        return <Loader />;
    }

    return (
        <div className={classNames(styles.articlerating, {}, [className])}>
            <Text title={t('Article Rating:')} />
            <Rating rating={calculatedRating} onRatingSubmit={handleSubmit} hasVoted={hasVoted} />
            <Text text={`(${calculatedRating} of 5, ${ratings?.length} voted)`} />
        </div>
    );
});
