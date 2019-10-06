import { useState, useEffect, useRef } from 'react';

export const usePrevious = (value) => {
    const prevRef = useRef();
    useEffect(() => {
        prevRef.current = value;
    }, [value]);

    return prevRef.current;
};

export const useMouseMove = () => {
    const [coords, setCoords] = useState([0, 0]);

    useEffect(() => {
        const handler = ({ clientX, clientY }) => {
            setCoords([clientX, clientY]);
        };
        window.addEventListener('mousemove', handler);
        return () => {
            window.removeEventListener('mousemove', handler);
        };
    }, []);

    return coords;
};
