import React from 'react';
import { connect } from 'react-redux';
import { CustomNav } from '../components/Layout';
import { COINS } from '../constants/constants';
import { APP_STATE, setCurrentCoin } from '../Redux/actions';

const NavContainer = (props) => {
    const { currentCoin, setCurrentCoin } = props;
    console.log(COINS);
    return <CustomNav currentCoin={currentCoin} setCurrentCoin={setCurrentCoin} coinList={COINS} />;
};

const mapStateToProps = (state) => ({
    currentCoin: state[APP_STATE].currentCoin
});

export default connect(
    mapStateToProps,
    { setCurrentCoin }
)(NavContainer);
