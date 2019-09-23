import { SET_CURRENT_COIN, SET_CURRENT_DURATION } from '../actions';

const defaultState = {
    currentCoin: 'BTC',
    currentDuration: 'WEEK'
};

const app = (state = defaultState, action) => {
    const { type, payload } = action;
    switch (type) {
        case SET_CURRENT_COIN:
            return { ...state, currentCoin: payload };
        case SET_CURRENT_DURATION:
            return { ...state, currentDuration: payload };
        default:
            return state;
    }
};

export { app };
