import React from 'react';
import { extent, timeFormat } from 'd3';
import { DEFAULT_TICK_COUNT } from '../../../constants/constants';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(({ spacing }) => ({
    horizontalChartAxis: {
        paddingTop: spacing(1),
        paddingDown: spacing(4),
        paddingLeft: spacing(8),
        paddingRight: spacing(8)
    }
}));

const formatTime = (timestamp, duration) => {
    switch (duration) {
        case 'ALL':
            return timeFormat('%b %Y')(timestamp); // 'Mmm YYYY'
        case 'YEAR':
        case 'MONTH':
        case 'WEEK':
            return timeFormat('%b %_d')(timestamp); // 'Mmm D'
        case 'DAY':
        case 'HOUR':
        default:
            return timeFormat('%I:%M %p')(timestamp); // 'HH:MM PM/AM'
    }
};

const generateTimeAxisTicks = (data, tickCount) => {
    if (data.length < 2) {
        return [];
    }
    const [minTime, maxTime] = extent(data, (d) => d.time);
    const rangeStep = (maxTime - minTime) / (tickCount - 1);
    const time = new Date(minTime).valueOf();
    console.log(time, rangeStep);
    let generatedTicks = [];
    for (let i = 0; i < tickCount; i++) {
        generatedTicks.push(time + i * rangeStep);
    }
    return generatedTicks;
};

const HorizontalChartAxis = (props) => {
    const { data, duration, tickCount = DEFAULT_TICK_COUNT } = props;
    const classes = useStyles();
    const axisTicks = generateTimeAxisTicks(data, tickCount);
    console.log(tickCount, axisTicks);
    return (
        <Grid container justify='space-between' className={classes.horizontalChartAxis}>
            {axisTicks &&
                axisTicks.map((time) => (
                    <Typography key={time} color='textSecondary' variant='body2'>
                        <span>{formatTime(time, duration)}</span>
                    </Typography>
                ))}
        </Grid>
    );
};

export default HorizontalChartAxis;
