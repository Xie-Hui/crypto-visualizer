import {
    SET_CURRENT_COIN,
    SET_CURRENT_DURATION,
    SET_CURRENT_CURRENCY,
    SET_HISTORY_DATA,
    SET_SPOT_DATA,
    SET_LAST_TIMESTAMP
} from '../actions';

const defaultState = {
    currentCoin: 'BTC',
    currentDuration: 'WEEK',
    currentCurrency: 'USD',
    priceHistory: [],
    spotTimestamp: null, // the latest timestamp for spot prices
    lastTimestamp: null, // the latest timestamp for data change indicator
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
        case SET_LAST_TIMESTAMP:
            return { ...state, lastTimestamp: payload };
        case SET_HISTORY_DATA:
            return {
                ...state,
                priceHistory: payload.data,
                lastTimestamp: new Date()
            };
        case SET_SPOT_DATA:
            return {
                ...state,
                spotPrices: payload.data,
                spotTimestamp: new Date()
            };
        default:
            return state;
    }
};

export { app };
