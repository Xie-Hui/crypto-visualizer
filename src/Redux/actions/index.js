export const APP_STATE = 'APP_STATE';
export const SET_CURRENT_COIN = 'SET_CURRENT_COIN';
export const SET_CURRENT_DURATION = 'SET_CURRENT_DURATION';
export const SET_HISTORY_DATA = 'SET_HISTORY_DATA';

export const setCurrentCoin = (name) => ({
    type: SET_CURRENT_COIN,
    payload: name
});

export const setCurrentDuration = (duration) => ({
    type: SET_CURRENT_DURATION,
    payload: duration
});

export const setHistoryData = (coin, data) => ({
    type: SET_HISTORY_DATA,
    payload: { coin, data }
});
