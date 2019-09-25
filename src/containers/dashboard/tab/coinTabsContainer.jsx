import React from 'react';
import { connect } from 'react-redux';

import { MyTabs } from '../../../components/tab';
import { setCurrentCoin, APP_STATE } from '../../../Redux/actions';
import { COINS } from '../../../constants/constants';

const CoinTabsContainer = (props) => {
    const { currentCoin, setCurrentCoin } = props;
    return (
        <MyTabs
            tabs={COINS.keys.map((key) => COINS[key])}
            value={COINS.keys.indexOf(currentCoin)}
            onChange={(e, i) => {
                setCurrentCoin(COINS.keys[i]);
            }}
        />
    );
};

const mapStateToProps = (state) => ({
    currentCoin: state[APP_STATE].currentCoin
});

export default connect(
    mapStateToProps,
    { setCurrentCoin }
)(CoinTabsContainer);
