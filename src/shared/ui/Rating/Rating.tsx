import {
    DetailedHTMLProps, HTMLAttributes, memo, useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import styles from './Rating.module.scss';
import StarIcon from '../../assets/icons/star.svg';

interface RatingProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    rating: number;
    onRatingSubmit: (rating: number) => void;
    hasVoted: boolean;
    className?: string;
}

export const Rating = memo(({
    className, rating, hasVoted, onRatingSubmit,
}: RatingProps) => {
    const { t } = useTranslation();
    const stars = [1, 2, 3, 4, 5];
    const [isHovered, setIsHovered] = useState(Boolean(rating) || false);
    const [hoverIndex, setHoverIndex] = useState(rating || 0);
    const [isVoted, setIsVoted] = useState(hasVoted || false);
    const handleMouseEnter = (index: number) => {
        if (isVoted) return;
        setIsHovered(true);
        setHoverIndex(index);
    };
    const handleMouseLeave = () => {
        if (isVoted) return;
        setHoverIndex(0);
        setIsHovered(false);
    };
    const handleStarClick = (index: number) => {
        onRatingSubmit(index);
        setHoverIndex(index);
        setIsVoted(true);
    };
    return (
        <div className={classNames(styles.rating, { [styles.voted]: hasVoted }, [className])}>
            { stars.map((starCount) => (
                <StarIcon
                    key={starCount}
                    onMouseEnter={() => handleMouseEnter(starCount)}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => handleStarClick(starCount)}
                    className={classNames(styles.starIcon, { [styles.filled]: hoverIndex >= starCount && isHovered })}
                />
            )) }
        </div>
    );
});
