import React from 'react';
import { makeStyles } from '@material-ui/styles';

const HOVER_PRICE_WIDTH = 200;
const VERTICAL_OFFSET = -12;

const useStyles = makeStyles(({ palette, spacing }) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        position: 'absolute',
        width: `${HOVER_PRICE_WIDTH}px`
    },
    priceWrapper: {
        borderRadius: spacing(0.5),
        paddingTop: spacing(0.2),
        paddingBottom: spacing(0.2),
        paddingLeft: spacing(0.5),
        paddingRight: spacing(0.5)
    },
    top: {
        background: palette.primary.main,
        border: 'none',
        color: '#fff'
    },
    bottom: {
        background: '#fff',
        border: `1px solid ${palette.primary.main}`,
        color: palette.primary.main
    }
}));

const HoverPrice = (props) => {
    const { bottom, top, x, value, visible } = props;
    const classes = useStyles();
    return (
        <div
            className={classes.root}
            style={{
                bottom: bottom && VERTICAL_OFFSET,
                left: x - HOVER_PRICE_WIDTH / 2,
                top: top && VERTICAL_OFFSET,
                opacity: visible ? 1 : 0,
                transition: 'opacity 300ms'
            }}
        >
            <div className={`${classes.priceWrapper} ${top ? classes.top : classes.bottom}`}>
                {value}
            </div>
        </div>
    );
};
export default HoverPrice;
