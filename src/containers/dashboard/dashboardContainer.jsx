import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import withWidth from '@material-ui/core/withWidth';
import { Paper, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import Tabbar from './tab/tabBar';
import { Skeleton } from '@material-ui/lab';
import { fetchPriceHistory } from '../../API/api';
import { setHistoryData, APP_STATE, setLastTimestamp } from '../../Redux/actions';
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
    const { currentCoin, currentDuration, currentCurrency, setHistoryData, width } = props;

    useEffect(() => {
        fetchPriceHistory(currentCoin, currentCurrency, currentDuration)
            .then((data) => {
                setHistoryData(data);
            })
            .catch((error) => console.log(error));
    }, [currentCoin, currentDuration, currentCurrency]);

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
                <div style={{ width: '100%' }}>
                    <ChartsContainer height={'250px'} />
                </div>
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
        setLastTimestamp
    }
)(withWidth()(DashboardContainer));
