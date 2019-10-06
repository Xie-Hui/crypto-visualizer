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

const Tabbar = () => {
    const classes = useTabbarStyles();
    return (
        <Grid container justify='space-between' className={classes.root}>
            <Grid item>
                <CoinTabsContainer />
            </Grid>
            <Grid item xs></Grid>
            <Grid item>
                <TimeTabsContainer />
            </Grid>
        </Grid>
    );
};

export default Tabbar;
