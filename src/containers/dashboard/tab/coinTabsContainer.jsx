import React from 'react';
import { connect } from 'react-redux';

import { MyTabs } from '../../../components/tab';
import { setCurrentCoin, APP_STATE } from '../../../Redux/actions';
import { COINS } from '../../../constants/constants';
import withWidth from '@material-ui/core/withWidth';
import { formatCurrency } from '../../../utils/formatCurrency';

const CoinTabsContainer = (props) => {
    const { currentCoin, setCurrentCoin, width, spotPrices, currentCurrency } = props;
    const getSpotPrice = (coinKey) => {
        const spotPrice = spotPrices[coinKey] && spotPrices[coinKey].price;
        const coinPrice = formatCurrency(spotPrice, currentCurrency);
        return coinPrice;
    };

    return (
        <MyTabs
            tabs={
                width !== 'xs' && width !== 'sm'
                    ? COINS.keys.map((key) => ({
                          ...COINS[key],
                          name: `${COINS[key].name} ⋅ ${getSpotPrice(key)}`
                      }))
                    : COINS.keys.map((key) => COINS[key])
            }
            value={COINS.keys.indexOf(currentCoin)}
            onChange={(e, i) => {
                setCurrentCoin(COINS.keys[i]);
            }}
        />
    );
};

const mapStateToProps = (state) => ({
    currentCoin: state[APP_STATE].currentCoin,
    spotPrices: state[APP_STATE].spotPrices,
    currentCurrency: state[APP_STATE].currentCurrency
});

export default connect(
    mapStateToProps,
    { setCurrentCoin }
)(withWidth()(CoinTabsContainer));
