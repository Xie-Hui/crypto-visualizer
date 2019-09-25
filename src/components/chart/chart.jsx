import React, { useRef, useEffect } from 'react';
import {
    area as d3Area,
    line as d3Line,
    easeCubicOut,
    extent,
    scaleLinear,
    scaleTime,
    select
} from 'd3';

const CHART_PADDING_TOP = 50;

const scaleData = (data, height, width) => {
    console.log('Scale DAta');
    console.log({ height, width });

    const scalePriceToY = scaleLinear()
        .range([height, 0])
        .domain(extent(data, (d) => d.price));

    const scaleTimeToX = scaleTime()
        .range([0, width])
        .domain(extent(data, (d) => d.time));

    return data.map(({ price, time }) => ({
        price: scalePriceToY(price),
        time: scaleTimeToX(time)
    }));
};

const Chart = (props) => {
    const { color, data, height, width } = props;

    const targetRef = useRef();
    useEffect(() => {
        if (height && width && data && color) {
            const chart = select(targetRef.current);
            const area = d3Area()
                .x((d) => d.time)
                .y0(height)
                .y1((d) => d.price);
            const line = d3Line()
                .x((d) => d.time)
                .y((d) => d.price);

            const scaledData = scaleData(data, height, width);
            const areaChart = area(scaledData);
            const lineChart = line(scaledData);

            // clear up
            chart.selectAll('path').remove();

            // draw area
            chart
                .append('path')
                .attr('d', areaChart)
                .style('fill', color);

            // draw line
            chart
                .append('path')
                .attr('d', lineChart)
                .attr('fill', 'none')
                .style('stroke', 'red');
        }
    }, [color, data, height, width]);

    return <g ref={targetRef} />;
};

export default Chart;
