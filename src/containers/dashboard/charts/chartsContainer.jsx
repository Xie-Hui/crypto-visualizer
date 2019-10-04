import React, { useLayoutEffect, useRef, useState, useCallback } from 'react';
import { connect } from 'react-redux';
import { APP_STATE } from '../../../Redux/actions';

import Chart from '../../../components/chart/chart';
import { COINS } from '../../../constants/constants';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import VerticalChartAxis from '../../../components/chart/chartAxis/verticalChartAxis';
import HorizontalChartAxis from '../../../components/chart/chartAxis/horizontalChartAxis';

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
    const targetRef = useRef(null);
    const [dimensions, setDimensions] = useState({});
    const classes = useStyles({ height });

    const handleResize = useCallback(() => {
        const { height, width } = targetRef.current.getBoundingClientRect();
        const dimensions = {
            height: Math.round(height),
            width: Math.round(width)
        };
        setDimensions(dimensions);
    }, [targetRef]);

    // add and remove resize listener
    useLayoutEffect(() => {
        handleResize();

        //add/remove resize listener
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [targetRef.current]);

    return (
        <div>
            <Grid className={classes.topSection} container direction='row' wrap='nowrap'>
                <Grid item>
                    <VerticalChartAxis data={data} currency={currentCurrency} textAlign='right' />
                </Grid>
                <Grid item className={classes.priceChart} height={height}>
                    <svg ref={targetRef} style={{ width: '100%', height: '100%' }}>
                        {Object.keys(data).length > 0 && data ? (
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
                        ) : null}
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
