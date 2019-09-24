import React, { useCallback, useLayoutEffect, useRef, useState } from 'react';

const ChartsContainer = (props) => {
    const targetRef = useRef();
    const [dimensions, setDimensions] = useState({});

    // add and remove resize listener
    useLayoutEffect(() => {
        const { height, width } = targetRef.current.getBoundingClientRect();
        const dimensions = {
            height: Math.round(height),
            width: Math.round(width)
        };
        setDimensions(dimensions);
        console.log(dimensions);
    }, [targetRef.current]);
    return (
        <svg ref={targetRef}>
            <div style={{ height: '100%' }}>teetetetet</div>
        </svg>
    );
};

export default ChartsContainer;
