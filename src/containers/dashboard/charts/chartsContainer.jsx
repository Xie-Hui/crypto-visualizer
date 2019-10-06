import React, { useLayoutEffect, useRef, useState, useEffect, useCallback } from 'react';
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
import { useMouseMove } from '../../../utils/customHooks';

const useStyles = makeStyles(({ palette, spacing }) => ({
    root: {
        width: '100%'
    },
    topSection: {
        borderBottom: `1px solid ${palette.grey[200]}`
    },
    priceChart: {
        cursor: 'crosshair',
        width: '100%',
        marginRight: spacing(1),
        marginLeft: spacing(1),
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
    const [hoverState, setHoverState] = useState({
        hoverX: 0,
        hoverY: 0,
        visible: false
    });

    const classes = useStyles();

    const handleResize = useCallback(() => {
        console.log('handleResize!');
        const { height, width, left, right } = chartSvgComponentRef.current.getBoundingClientRect();
        const dimensions = {
            height: Math.round(height),
            width: Math.round(width),
            left: Math.round(left),
            right: Math.round(right)
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
    }, [handleResize]);

    const hideHoverElement = () => {
        setHoverState({
            ...hoverState,
            hovered: false
        });
    };

    const scalePriceToY = scaleLinear()
        .range([dimensions.height - CHART_PADDING_BOTTOM, CHART_PADDING_TOP])
        .domain(extent(data, (d) => d.price));

    const updateHoverPosition = ({ clientX }) => {
        const hoverX = clientX - dimensions.left;
        const index = Math.round((hoverX / dimensions.width) * (data.length - 1));
        const hoveredDataPoint = data[index] || {};
        const hoveredValue = {
            price:
                hoveredDataPoint.price && formatCurrency(hoveredDataPoint.price, currentCurrency),
            time: hoveredDataPoint.time && hoveredDataPoint.time.toLocaleString()
        };

        const hoverY = scalePriceToY(hoveredDataPoint.price);
        if (hoverX && hoverY) {
            setHoverState({
                hovered: Boolean(hoveredDataPoint),
                hoveredValue,
                hoverX,
                hoverY
            });
        }
    };

    const [x, y] = useMouseMove();

    useEffect(() => {
        if (x >= dimensions.left && x <= dimensions.right) {
            updateHoverPosition({ clientX: x });
        } else {
            hideHoverElement();
        }
    }, [x, dimensions]);

    const { hovered, hoveredValue, hoverX, hoverY } = hoverState;
    return (
        <div className={classes.root}>
            <Grid className={classes.topSection} container direction='row' wrap='nowrap'>
                <Grid item>
                    <VerticalChartAxis data={data} currency={currentCurrency} textAlign='right' />
                </Grid>
                <Grid
                    item
                    className={classes.priceChart}
                    height={height}
                    style={{ height: height }}
                    //onMouseMove={(e) => updateHoverPosition(e)}
                >
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
                    <svg ref={chartSvgComponentRef} style={{ width: '100%', height: '100%' }}>
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
