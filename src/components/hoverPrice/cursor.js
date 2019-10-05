import React from 'react';
import { makeStyles } from '@material-ui/styles';

const CURSOR_RADIUS_SIZE = 4;

const useStyles = makeStyles(({ palette }) => ({
    root: {
        zIndex: 2,
        transition: 'opacity 300ms',
        opacity: ({ visible }) => (visible ? 1 : 0)
    },
    line: {
        stroke: palette.primary.main,
        strokeWidth: '0.5px'
    },
    circle: {
        stroke: palette.primary.main,
        strokeWidth: '2px',
        fill: '#fff'
    }
}));

const Cursor = ({ height, visible, x, y }) => {
    const classes = useStyles({ height, visible, x, y });

    return (
        <g className={classes.root}>
            <line className={classes.line} x1={x} x2={x} y1={0} y2={height} />
            <circle className={classes.circle} cx={x} cy={y} r={CURSOR_RADIUS_SIZE} />
        </g>
    );
};

export default Cursor;
