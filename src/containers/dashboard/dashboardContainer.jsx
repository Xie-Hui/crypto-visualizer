import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
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
        margin: spacing(2),
        maxWidth: '1500px',
        minHeight: '80vh'
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
            <Grid container flexDirection='column'>
                <Grid item>
                    <Tabbar />
                </Grid>
                <Grid item container spacing={2} flexDirection='row'>
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
                <Grid
                    item
                    zeroMinWidth
                    style={{ width: '100%', minHeight: '300px', margin: '2rem' }}
                >
                    <ChartsContainer />
                </Grid>
            </Grid>
        </Paper>
    );
};

DashboardContainer.propTypes = {
    setHistoryData: PropTypes.arrayOf(
        PropTypes.shape({
            price: PropTypes.number,
            time: PropTypes.instanceOf(Date)
        })
    )
};

export default connect(
    null,
    {
        setHistoryData
    }
)(DashboardContainer);
