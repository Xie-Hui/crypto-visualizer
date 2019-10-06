import React from 'react';
import PropTypes from 'prop-types';

import { extent } from 'd3';
import { makeStyles } from '@material-ui/styles';
import { Grid, Typography } from '@material-ui/core';

import { formatCurrency } from '../../../utils/formatCurrency';

const useStyles = makeStyles(({ spacing }) => ({
    verticalAxis: {
        paddingTop: spacing(1.5),
        paddingBottom: spacing(1.5),
        width: 'auto',
        height: '100%',
        minWidth: spacing(6)
    }
}));

const VerticalChartAxis = (props) => {
    const { data, textAlign, currency } = props;
    const [minPrice, maxPrice] = extent(data, (d) => d.price);
    const classes = useStyles();

    return (
        <Grid container direction='column' justify='space-between' className={classes.verticalAxis}>
            <Typography variant='body2' color='textSecondary' align={textAlign}>
                {formatCurrency(maxPrice, currency)}
            </Typography>
            <Typography variant='body2' color='textSecondary' align={textAlign}>
                {formatCurrency(minPrice, currency)}
            </Typography>
        </Grid>
    );
};

VerticalChartAxis.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            price: PropTypes.number,
            time: PropTypes.data
        })
    ).isRequired,
    currency: PropTypes.string,
    textAlign: PropTypes.oneOf(['left', 'right']).isRequired
};

export default VerticalChartAxis;
