import {
    ImgHTMLAttributes, memo, ReactElement, ReactNode, useEffect, useLayoutEffect, useRef, useState,
} from 'react';
import { classNames } from 'shared/lib/classNames/classNames';

interface LazyImageProps extends ImgHTMLAttributes<HTMLImageElement> {
    className?: string;
    fallback?: ReactElement;
    errorFallback?: ReactElement;
    alt?: string;
}

export const LazyImage = memo(({
    className,
    fallback,
    src,
    errorFallback,
    alt = 'image',
    ...otherProps
}: LazyImageProps) => {
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(true);
    const ref = useRef<HTMLImageElement>(null);
    useLayoutEffect(() => {
        const image = new Image();
        image.src = src ?? '';
        image.onload = () => {
            setIsLoading(false);
        };
        image.onerror = () => {
            setIsLoading(false);
            setHasError(true);
        };
    }, [src]);

    if (isLoading && fallback) {
        return fallback;
    }
    if (hasError && errorFallback) {
        return errorFallback;
    }
    return (
        <img
            {...otherProps}
            ref={ref}
            src={src}
            className={classNames('', {}, [className])}
            alt={alt}
        />
    );
});
