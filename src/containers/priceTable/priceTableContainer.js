import React from 'react';
import { Grid } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import PriceTableCell from './priceTableCell';
import { COINS, DURATIONS } from '../../constants/constants';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(({ palette, spacing }) => ({
    root: {
        borderBottom: `1px solid ${palette.grey[200]}`,
        paddingTop: spacing(3),
        paddingBottom: spacing(3),
        '& > div:not(:first-child)': {
            borderLeft: `1px solid ${palette.grey[200]}`
        }
    }
}));

const shouldUpdate = (prevProps, nextProps) => {
    if (
        !prevProps.spotTimestamp ||
        !prevProps.lastTimestamp ||
        (prevProps.spotTimestamp !== nextProps.nextProps &&
            prevProps.lastTimestamp !== nextProps.lastTimestamp)
    ) {
        return false;
    }
    return true;
};

const PriceTableContainer = React.memo((props) => {
    const { priceHistory, spotPrices, currentCoin, currentCurrency, currentDuration } = props;
    const spotPrice = spotPrices[currentCoin] && spotPrices[currentCoin].price;
    const oldPrice = priceHistory[0] && priceHistory[0].price;
    const priceDifference = spotPrice - oldPrice;
    const percentageDifference = (spotPrice / oldPrice - 1) * 100 || 0;
    const durationLabel = DURATIONS[currentDuration].friendly;
    const classes = useStyles();

    return (
        <Grid container className={classes.root}>
            <Grid item xs={4}>
                {/* <Skeleton disableAnimate={true} height={125} /> */}
                <PriceTableCell
                    label={`${COINS[currentCoin].name} price`}
                    currency={currentCurrency}
                    isCurrency
                    value={spotPrice}
                />
            </Grid>
            <Grid item xs={4}>
                <PriceTableCell
                    showPlusCharacter={priceDifference > 0}
                    label={`${durationLabel} (${currentCurrency})`}
                    currency={currentCurrency}
                    isCurrency
                    value={priceDifference}
                    visible={Boolean(durationLabel)}
                />
            </Grid>
            <Grid item xs={4}>
                <PriceTableCell
                    showPlusCharacter={percentageDifference > 0}
                    isPercentage
                    currency={currentCurrency}
                    label={`${durationLabel} (%)`}
                    value={percentageDifference}
                    visible={Boolean(durationLabel)}
                />
            </Grid>
        </Grid>
    );
}, shouldUpdate);

export default PriceTableContainer;
