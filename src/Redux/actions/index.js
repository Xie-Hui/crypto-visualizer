export const APP_STATE = 'APP_STATE';
export const SET_CURRENT_COIN = 'SET_CURRENT_COIN';
export const SET_CURRENT_DURATION = 'SET_CURRENT_DURATION';
export const SET_CURRENT_CURRENCY = 'SET_CURRENT_CURRENCY';
export const SET_HISTORY_DATA = 'SET_HISTORY_DATA';
export const SET_LAST_TIMESTAMP = 'SET_LAST_TIMESTAMP';

export const setCurrentCoin = (name) => ({
    type: SET_CURRENT_COIN,
    payload: name
});

export const setCurrentDuration = (duration) => ({
    type: SET_CURRENT_DURATION,
    payload: duration
});

export const setCurrentCurrency = (currency) => ({
    type: SET_CURRENT_CURRENCY,
    payload: currency
});

export const setHistoryData = (data) => ({
    type: SET_HISTORY_DATA,
    payload: { data }
});

export const setLastTimestamp = (timestamp) => ({
    type: SET_LAST_TIMESTAMP,
    payload: timestamp
});
