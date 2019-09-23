export const APP_STATE = 'APP_STATE';
export const SET_CURRENT_COIN = 'SET_CURRENT_COIN';
export const SET_CURRENT_DURATION = 'SET_CURRENT_DURATION';

export const setCurrentCoin = (name) => ({
    type: SET_CURRENT_COIN,
    payload: name
});

export const setCurrentDuration = (duration) => ({
    type: SET_CURRENT_DURATION,
    payload: duration
});
