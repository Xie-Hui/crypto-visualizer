import React from 'react';
import { makeStyles } from '@material-ui/styles';

const HOVER_PRICE_WIDTH = 200;
const VERTICAL_OFFSET = -12;

const useStyles = makeStyles(({ palette, spacing }) => ({
    root: {
        bottom: ({ bottom }) => bottom && VERTICAL_OFFSET,
        left: ({ x }) => x - HOVER_PRICE_WIDTH / 2,
        top: ({ top }) => top && VERTICAL_OFFSET,
        transition: 'opacity 300ms',
        opacity: ({ visible }) => (visible ? 1 : 0),
        display: 'flex',
        justifyContent: 'center',
        position: 'absolute',
        width: '200px'
    },
    priceWrapper: {
        borderRadius: spacing(0.5),
        paddingTop: spacing(0.2),
        paddingDown: spacing(0.2),
        paddingLeft: spacing(0.5),
        paddingRight: spacing(0.5),
        background: ({ top }) => (top ? palette.primary.main : '#fff'),
        border: ({ top }) => (top ? 'none' : `1px solid ${palette.primary.main}`),
        color: ({ top }) => (top ? '#fff' : palette.primary.main)
    }
}));

const HoverPrice = (props) => {
    const { value } = props;
    const classes = useStyles(props);

    return (
        <div className={classes.root}>
            <div className={classes.priceWrapper}>{value}</div>
        </div>
    );
};

export default HoverPrice;
