import React, { useRef } from 'react';

const Chart = (props) => {
    const { color, data, height, width } = props;
    const targetRef = useRef();
    return <g ref={targetRef} />;
};

export default Chart;
