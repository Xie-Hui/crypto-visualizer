import React from 'react';
import { formatCurrency } from '../../utils/formatCurrency';
import { makeStyles } from '@material-ui/styles';
import { Grid, Typography } from '@material-ui/core';

const PLUS_CHAR = '+';
const MINUS_CHAR = '\u2212';

const useStyles = makeStyles(({ spacing, palette }) => ({
    root: {
        width: '100%',
        height: '100%'
    },
    value: {
        marginBottom: spacing(0.5)
    },
    showPlus: {},
    label: {
        textTransform: 'uppercase',
        fontSize: '1rem'
    },
    digits: {
        fontFamily: 'lato, sans-serif',
        fontWeight: '400',
        color: palette.text.primary
    }
}));

const PriceTableCell = ({
    label,
    value,
    currency,
    isCurrency,
    isPercentage,
    showPlusCharacter,
    visible = true
}) => {
    const isNegative = value < 0;
    const absValue = Math.abs(value);
    const currencyValue = formatCurrency(absValue, currency, 2);
    const percentageValue = Number(absValue).toFixed(2);
    const classes = useStyles();

    return (
        visible && (
            <Grid container alignItems='center' className={classes.root}>
                <Grid
                    container
                    item
                    direction='column'
                    justify='center'
                    alignItems='center'
                    wrap='nowrap'
                >
                    <Grid
                        item
                        container
                        alignItems='flex-start'
                        justify='center'
                        className={classes.value}
                    >
                        {showPlusCharacter && (
                            <Typography variant='h4' component='span' className={classes.digits}>
                                {PLUS_CHAR}
                            </Typography>
                        )}
                        {isNegative && (
                            <Typography variant='h4' component='span' className={classes.digits}>
                                {MINUS_CHAR}
                            </Typography>
                        )}
                        {isCurrency && (
                            <Typography variant='h4' component='span' className={classes.digits}>
                                {currencyValue.slice(0, 1)}
                            </Typography>
                        )}
                        {isCurrency && (
                            <Typography variant='h3' component='span' className={classes.digits}>
                                {currencyValue.slice(1, -3)}
                            </Typography>
                        )}
                        {isCurrency && (
                            <Typography variant='h4' component='span' className={classes.digits}>
                                {currencyValue.slice(-3)}
                            </Typography>
                        )}
                        {isPercentage && (
                            <Typography variant='h3' component='span' className={classes.digits}>
                                {percentageValue}
                            </Typography>
                        )}
                        {isPercentage && (
                            <Typography variant='h4' component='span' className={classes.digits}>
                                %
                            </Typography>
                        )}
                    </Grid>
                    <Typography variant='overline' color='textSecondary' className={classes.label}>
                        {label}
                    </Typography>
                </Grid>
            </Grid>
        )
    );
};

export default PriceTableCell;
