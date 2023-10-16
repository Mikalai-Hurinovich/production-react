import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { CSSProperties, useMemo } from 'react';
import styles from './Avatar.module.scss';

interface AvatarProps {
    className?: string;
    src?: string;
    size?: number;
    alt?: string;
}

export const Avatar = ({
    className,
    src = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
    size,
    alt,
}: AvatarProps) => {
    const mods: Mods = {};

    const style = useMemo<CSSProperties>(() => ({
        width: size || 100,
        height: size || 100,
    }), [size]);

    return (
        <img
            src={src}
            alt={alt}
            style={style}
            className={classNames(styles.Avatar, mods, [className])}
        />
    );
};
