import React, { Fragment, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { makeStyles } from '@material-ui/styles';
import { globalStyle } from '../../styles/theme';
import { CssBaseline } from '@material-ui/core';
import { connect } from 'react-redux';
import { APP_STATE } from '../../Redux/actions';
import { fetchCoinIcon } from '../../API/api';
import { formatCurrency } from '../../utils/formatCurrency';
import { default as defaultIcon } from 'cryptocurrency-icons/svg/color/generic.svg';

const useStyles = makeStyles((theme) => ({
    ...globalStyle(theme)
}));

const Layout = (props) => {
    const [icon, setIcon] = useState(defaultIcon);
    const globalStyles = useStyles();
    const { coin, spotPrices, currency } = props;
    const spotPrice = spotPrices[coin] && spotPrices[coin].price;
    const coinPrice = formatCurrency(spotPrice, currency, 2);

    useEffect(() => {
        console.log(coin);
        fetchCoinIcon(coin)
            .then((icon) => {
                console.log(icon);
                setIcon(icon);
            })
            .catch((error) => console.log(error));
    }, [coin]);

    return (
        <Fragment>
            <CssBaseline />
            <Helmet>
                <title>{`${coin}⋅${coinPrice}`}</title>
                <link rel='shortcut icon' href={icon} />
            </Helmet>
            <div className={globalStyles}>{props.children}</div>
        </Fragment>
    );
};

const mapStateToProps = (state) => ({
    coin: state[APP_STATE].currentCoin,
    spotPrices: state[APP_STATE].spotPrices,
    currency: state[APP_STATE].currentCurrency
});

export default connect(mapStateToProps)(Layout);
