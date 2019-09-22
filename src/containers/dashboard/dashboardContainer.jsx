import React from 'react';
import { Typography, Paper, Grid, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import Tabbar from './tab/tabBar';
import { Skeleton } from '@material-ui/lab';

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
                <div>
                    <Skeleton disableAnimate={true} height={400} />
                </div>
            </div>
        </Paper>
    );
};

export default DashboardContainer;
