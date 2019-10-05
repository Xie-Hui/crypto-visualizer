import React, { useLayoutEffect, useRef, useState, useCallback } from 'react';
import { connect } from 'react-redux';
import { APP_STATE } from '../../../Redux/actions';

import Chart from '../../../components/chart/chart';
import { COINS, CHART_PADDING_TOP, CHART_PADDING_BOTTOM } from '../../../constants/constants';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import VerticalChartAxis from '../../../components/chart/chartAxis/verticalChartAxis';
import HorizontalChartAxis from '../../../components/chart/chartAxis/horizontalChartAxis';

import { extent, scaleLinear } from 'd3';
import { formatCurrency } from '../../../utils/formatCurrency';
import HoverPrice from '../../../components/hoverPrice/hoverPrice';
import Cursor from '../../../components/hoverPrice/cursor';

const useStyles = makeStyles(({ palette, spacing }) => ({
    topSection: {
        borderBottom: `1px solid ${palette.grey[200]}`
    },
    priceChart: {
        cursor: 'crosshair',
        height: (props) => props.height,
        width: '100%',
        paddingRight: spacing(1),
        paddingLeft: spacing(1),
        width: '100%',
        position: 'relative',
        width: '100%',
        zIndex: '10'
    }
}));

const ChartsContainer = (props) => {
    const { data, currentCoin, lastTimestamp, height, currentCurrency, duration } = props;
    const chartSvgComponentRef = useRef(null);
    const [dimensions, setDimensions] = useState({});
    const [hoverState, setHoverState] = useState({});

    const classes = useStyles({ height });

    const handleResize = useCallback(() => {
        console.log('handleResize!');
        const { height, width, left } = chartSvgComponentRef.current.getBoundingClientRect();
        const dimensions = {
            height: Math.round(height),
            width: Math.round(width),
            left: Math.round(left)
        };
        setDimensions(dimensions);
    }, [chartSvgComponentRef]);

    // add and remove resize listener
    useLayoutEffect(() => {
        handleResize();

        //add/remove resize listener
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [chartSvgComponentRef.current]);

    const showHoverElement = () => {
        setHoverState({
            ...hoverState,
            hovered: true
        });
    };

    const hideHoverElement = () => {
        setHoverState({
            ...hoverState,
            hovered: false
        });
    };

    const scalePriceToY = scaleLinear()
        .range([dimensions.height - CHART_PADDING_BOTTOM, CHART_PADDING_TOP])
        .domain(extent(data, (d) => d.price));

    const updateHoverPosition = (e) => {
        const hoverX = e.nativeEvent.clientX - dimensions.left;
        const index = Math.round((hoverX / dimensions.width) * (data.length - 1));
        const hoveredDataPoint = data[index] || {};
        const hoveredValue = {
            price:
                hoveredDataPoint.price && formatCurrency(hoveredDataPoint.price, currentCurrency),
            time: hoveredDataPoint.time && hoveredDataPoint.time.toLocaleString()
        };

        const hoverY = scalePriceToY(hoveredDataPoint.price) || 0;

        console.log('hovered: ', hoverState.hovered);
        console.log('cursor position: ', hoverX, hoverY);
        const { hoverX: prevX, hoverY: prevY } = hoverState;
        console.log('current, prev: ', hoverX, prevX);
        if (!prevX || !prevY || Math.abs(hoverX - prevX) > 10 || Math.abs(hoverY - prevY) > 10) {
            setHoverState({
                hovered: Boolean(hoveredDataPoint),
                hoveredValue,
                hoverX,
                hoverY
            });
        }
    };

    const { hovered, hoveredValue, hoverX, hoverY } = hoverState;
    return (
        <div>
            <Grid className={classes.topSection} container direction='row' wrap='nowrap'>
                <Grid item>
                    <VerticalChartAxis data={data} currency={currentCurrency} textAlign='right' />
                </Grid>
                <Grid item className={classes.priceChart} height={height}>
                    <HoverPrice
                        top
                        value={hoveredValue && hoveredValue.price}
                        visible={hovered}
                        x={hoverX}
                    />
                    <HoverPrice
                        bottom
                        value={hoveredValue && hoveredValue.time}
                        visible={hovered}
                        x={hoverX}
                    />
                    <svg
                        ref={chartSvgComponentRef}
                        style={{ width: '100%', height: '100%' }}
                        onMouseEnter={showHoverElement}
                        onMouseLeave={hideHoverElement}
                        onMouseMove={updateHoverPosition}
                    >
                        <Chart
                            color={{
                                fill: COINS[currentCoin].fillColor,
                                stroke: COINS[currentCoin].strokeColor
                            }}
                            data={data}
                            timestamp={lastTimestamp}
                            height={dimensions.height}
                            width={dimensions.width}
                        />
                        <Cursor
                            height={dimensions.height}
                            visible={hovered}
                            x={hoverX}
                            y={hoverY}
                        />
                    </svg>
                </Grid>
                <Grid item>
                    <VerticalChartAxis data={data} currency={currentCurrency} textAlign='left' />
                </Grid>
            </Grid>
            <HorizontalChartAxis data={data} duration={duration} />
        </div>
    );
};

const mapStateToProps = (state) => ({
    data: state[APP_STATE].priceHistory,
    currentCoin: state[APP_STATE].currentCoin,
    duration: state[APP_STATE].currentDuration,
    currentCurrency: state[APP_STATE].currentCurrency,
    lastTimestamp: state[APP_STATE].lastTimestamp
});

export default connect(
    mapStateToProps,
    null
)(ChartsContainer);
