import { useEffect, useState } from 'react';

const useScrollPosition = () => {
    const [scrollPosition, setScrollPosition] = useState(() => {
        const storedPosition = localStorage.getItem('scrollPosition');
        return storedPosition ? parseInt(storedPosition, 10) : 0;
    });

    const handleScroll = () => {
        const currentPosition = window.pageYOffset;
        setScrollPosition(currentPosition);
        localStorage.setItem('scrollPosition', currentPosition.toString());
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return scrollPosition;
};

export default useScrollPosition;
