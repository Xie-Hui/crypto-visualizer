import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { Paper, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import Tabbar from './tab/tabBar';
import { Skeleton } from '@material-ui/lab';
import { fetchPriceHistory } from '../../API/api';
import { setHistoryData } from '../../Redux/actions';
import ChartsContainer from './charts/chartsContainer';

const useDashboardStyles = makeStyles(({ palette, spacing }) => ({
    root: {
        backgroundColor: '#fff',
        borderRadius: '4px',
        display: 'flex',
        flexDirection: 'column',
        margin: '0 auto',
        maxWidth: '1500px',
        minWidth: '960px',
        width: '90vw'
        //height: '470px'
    },
    charts: {
        padding: spacing(4)
    }
}));

const DashboardContainer = (props) => {
    const { setHistoryData } = props;

    useEffect(() => {
        fetchPriceHistory('BTC')
            .then((data) => {
                setHistoryData('BTC', data);
            })
            .catch((error) => console.log(error));
    }, []);

    const classes = useDashboardStyles();
    return (
        <Paper className={classes.root}>
            <Tabbar />
            <div className={classes.charts}>
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <Skeleton disableAnimate={true} height={150} />
                    </Grid>
                    <Grid item xs={4}>
                        <Skeleton disableAnimate={true} height={150} />
                    </Grid>
                    <Grid item xs={4}>
                        <Skeleton disableAnimate={true} height={150} />
                    </Grid>
                </Grid>
                <div style={{ width: '100%' }}>
                    <ChartsContainer />
                </div>
            </div>
        </Paper>
    );
};

export default connect(
    null,
    {
        setHistoryData
    }
)(DashboardContainer);
