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
import { interpolatePath } from 'd3-interpolate-path';
import 'd3-transition';

import { usePrevious } from '../../utils/customHooks';

const CHART_PADDING_TOP = 20;
const CHART_PADDING_BOTTOM = 10;
const TRANSITION = { delay: 300, duration: 500, ease: easeCubicOut };

const scaleData = (data, height, width) => {
    const scalePriceToY = scaleLinear()
        .range([height - CHART_PADDING_BOTTOM, CHART_PADDING_TOP])
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
    const { color, data, height, width, timestamp } = props;
    const prevData = usePrevious(data) || data; // previous data, default to current data if not exist
    const prevColor = usePrevious(color) || color;
    const targetRef = useRef();

    useEffect(() => {
        if (height && width && timestamp && color) {
            console.log('previous:', prevData.length);
            console.log('current:', data.length);
            const chart = select(targetRef.current);
            const area = d3Area()
                .x((d) => d.time)
                .y0(height)
                .y1((d) => d.price);
            const line = d3Line()
                .x((d) => d.time)
                .y((d) => d.price);

            const scaledData = scaleData(data, height, width);
            const prevScaledData = scaleData(prevData, height, width);
            const areaChart = area(scaledData);
            const lineChart = line(scaledData);
            const prevAreaChart = area(prevScaledData);
            const prevLineChart = line(prevScaledData);
            // clear up
            chart.selectAll('path').remove();

            // draw area
            chart
                .append('path')
                .attr('d', areaChart)
                .style('fill', prevColor.fill)
                // transition
                .transition()
                .duration(TRANSITION.duration)
                .ease(TRANSITION.ease)
                .attrTween('d', () => interpolatePath(prevAreaChart, areaChart))
                .style('fill', color.fill);
            // draw line
            chart
                .append('path')
                .attr('d', lineChart)
                .attr('fill', 'none')
                .style('stroke', prevColor.stroke)
                .style('stroke-width', '2px')
                // transition
                .transition()
                .duration(TRANSITION.duration)
                .ease(TRANSITION.ease)
                .attrTween('d', () => interpolatePath(prevLineChart, lineChart))
                .style('stroke', color.stroke);
        }
    }, [color, timestamp, height, width]);

    return <g ref={targetRef} />;
};

export default Chart;
