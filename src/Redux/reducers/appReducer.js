import {
    SET_CURRENT_COIN,
    SET_CURRENT_DURATION,
    SET_CURRENT_CURRENCY,
    SET_HISTORY_DATA
} from '../actions';

const defaultState = {
    currentCoin: 'BTC',
    currentDuration: 'WEEK',
    currentCurrency: 'USD',
    priceHistory: {},
    spotPrices: []
};

const app = (state = defaultState, action) => {
    const { type, payload } = action;
    switch (type) {
        case SET_CURRENT_COIN:
            return { ...state, currentCoin: payload };
        case SET_CURRENT_DURATION:
            return { ...state, currentDuration: payload };
        case SET_CURRENT_CURRENCY:
            return { ...state, currentCurrency: payload };
        case SET_HISTORY_DATA:
            return {
                ...state,
                priceHistory: {
                    ...state.priceHistory,
                    [payload.coin]: payload.data
                }
            };
        default:
            return state;
    }
};

export { app };
