import React from 'react';
import { Grid } from '@material-ui/core';
import CoinTabsContainer from './coinTabsContainer';
import TimeTabsContainer from './timeTabsContainer';
import { makeStyles } from '@material-ui/styles';

const useTabbarStyles = makeStyles(({ palette, spacing }) => ({
    root: {
        width: '100%',
        paddingLeft: spacing(4),
        paddingRight: spacing(4),
        borderBottom: `1px solid ${palette.grey[200]}`
    }
}));

const Tabbar = (props) => {
    const classes = useTabbarStyles();
    return (
        <Grid container justify='space-between' className={classes.root}>
            <Grid item xs={6}>
                <CoinTabsContainer />
            </Grid>
            <Grid item xs={2}></Grid>
            <Grid item xs={4}>
                <TimeTabsContainer />
            </Grid>
        </Grid>
    );
};

export default Tabbar;
