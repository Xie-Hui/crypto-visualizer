import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import withWidth from '@material-ui/core/withWidth';
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import Tabbar from './tab/tabBar';
import { fetchPriceHistory, fetchSpotPrice } from '../../API/api';
import { setHistoryData, APP_STATE, setLastTimestamp, setSpotData } from '../../Redux/actions';
import ChartsContainer from './charts/chartsContainer';
import PriceTableContainer from '../priceTable/priceTableContainer';
import { POLL_FREQUENCY } from '../../constants/constants';

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
        paddingLeft: spacing(4),
        paddingRight: spacing(4),
        paddingBottom: spacing(4)
    }
}));

const DashboardContainer = (props) => {
    const {
        currentCoin,
        currentDuration,
        currentCurrency,
        priceHistory,
        spotPrices,
        setHistoryData,
        setSpotData,
        spotTimestamp,
        lastTimestamp
    } = props;

    const fetchPriceData = () => {
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
    };

    useEffect(() => {
        fetchPriceData();
        //start polling
        const pollingId = setInterval(() => {
            fetchPriceData();
        }, POLL_FREQUENCY);
        return () => clearInterval(pollingId);
    }, [currentCoin, currentDuration, currentCurrency, setHistoryData]);

    const classes = useDashboardStyles();

    return (
        <Paper className={classes.root}>
            <Tabbar />
            <div className={classes.charts}>
                <PriceTableContainer
                    spotPrices={spotPrices}
                    {...{
                        spotTimestamp,
                        lastTimestamp,
                        priceHistory,
                        spotPrices,
                        currentCoin,
                        currentCurrency,
                        currentDuration
                    }}
                />
                <ChartsContainer height={'250px'} />
            </div>
        </Paper>
    );
};

const mapStateToProps = (state) => ({
    currentCoin: state[APP_STATE].currentCoin,
    currentDuration: state[APP_STATE].currentDuration,
    currentCurrency: state[APP_STATE].currentCurrency,
    priceHistory: state[APP_STATE].priceHistory,
    spotPrices: state[APP_STATE].spotPrices,
    spotTimestamp: state[APP_STATE].spotTimestamp,
    lastTimestamp: state[APP_STATE].lastTimestamp
});

export default connect(
    mapStateToProps,
    {
        setHistoryData,
        setSpotData,
        setLastTimestamp
    }
)(withWidth()(DashboardContainer));
