import React from 'react';
import { connect } from 'react-redux';

import { MyTabs } from '../../../components/tab';
import { setCurrentCoin, APP_STATE } from '../../../Redux/actions';
import { COINS } from '../../../constants/constants';
import withWidth from '@material-ui/core/withWidth';

const CoinTabsContainer = (props) => {
    const { currentCoin, setCurrentCoin, width } = props;
    return (
        <MyTabs
            tabs={
                width !== 'xs'
                    ? COINS.keys.map((key) => COINS[key])
                    : COINS.keys.map((key) => ({ ...COINS[key], name: key }))
            }
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
)(withWidth()(CoinTabsContainer));
