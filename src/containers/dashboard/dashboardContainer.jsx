import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import withWidth from '@material-ui/core/withWidth';
import { Paper, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import Tabbar from './tab/tabBar';
import { Skeleton } from '@material-ui/lab';
import { fetchPriceHistory, fetchSpotPrice } from '../../API/api';
import { setHistoryData, APP_STATE, setLastTimestamp, setSpotData } from '../../Redux/actions';
import ChartsContainer from './charts/chartsContainer';

const useDashboardStyles = makeStyles(({ palette, spacing }) => ({
    root: {
        backgroundColor: '#fff',
        borderRadius: '4px',
        display: 'flex',
        flexDirection: 'column',
        margin: '0 auto',
        maxWidth: '1800px',
        minWidth: '900px',
        width: '90vw'
    },
    charts: {
        padding: spacing(4)
    }
}));

const DashboardContainer = (props) => {
    const {
        currentCoin,
        currentDuration,
        currentCurrency,
        setHistoryData,
        setSpotData,
        width
    } = props;

    useEffect(() => {
        fetchPriceHistory(currentCoin, currentCurrency, currentDuration)
            .then((data) => {
                setHistoryData(data);
            })
            .catch((error) => console.log(error));
        fetchSpotPrice(currentCoin, currentCurrency)
            .then((spotPrices) => {
                setSpotData(spotPrices);
            })
            .catch((error) => console.log(error));
    }, [currentCoin, currentDuration, currentCurrency, setHistoryData]);

    const classes = useDashboardStyles();

    return (
        <Paper className={classes.root}>
            <Tabbar />
            <div className={classes.charts}>
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <Skeleton disableAnimate={true} height={125} />
                    </Grid>
                    <Grid item xs={4}>
                        <Skeleton disableAnimate={true} height={125} />
                    </Grid>
                    <Grid item xs={4}>
                        <Skeleton disableAnimate={true} height={125} />
                    </Grid>
                </Grid>
                <ChartsContainer height={'250px'} />
            </div>
        </Paper>
    );
};

const mapStateToProps = (state) => ({
    currentCoin: state[APP_STATE].currentCoin,
    currentDuration: state[APP_STATE].currentDuration,
    currentCurrency: state[APP_STATE].currentCurrency
});

export default connect(
    mapStateToProps,
    {
        setHistoryData,
        setSpotData,
        setLastTimestamp
    }
)(withWidth()(DashboardContainer));
