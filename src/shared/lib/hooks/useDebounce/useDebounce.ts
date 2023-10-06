import { useCallback, useEffect, useRef } from 'react';

const useDebounce = <T extends (...args: any[]) => void>(callback: T, delay: number): T => {
    const ref = useRef<null | ReturnType<typeof setTimeout>>(null);

    const debouncedCallback = useCallback((...args: Parameters<T>) => {
        if (ref.current) {
            clearTimeout(ref.current);
        }
        ref.current = setTimeout(() => {
            callback(...args);
        }, delay);
    }, [callback, delay]);

    useEffect(() => () => {
        if (ref?.current) {
            clearTimeout(ref.current);
        }
    }, []);

    return debouncedCallback as T;
};
export default useDebounce;
