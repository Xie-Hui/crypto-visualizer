import axios from 'axios';
import { COINS } from '../constants/constants';

const transformHistoryData = (dataArr) => {
    return dataArr
        .map(({ time, price }) => ({
            time: new Date(time),
            price: +price // convert to number
        }))
        .sort((a, b) => a.time - b.time);
};

const fetchPriceHistory = async (coin, currency = 'USD', duration = 'DAY') => {
    const url = `https://www.coinbase.com/api/v2/prices/${coin.toLowerCase()}-${currency.toLowerCase()}/historic?period=${duration.toLowerCase()}`;
    const { data } = await axios(url);

    return transformHistoryData(data.data.prices);
};

const fetchSpotPrice = async (coin, currency = 'USD') => {
    const url = `https://api.coinbase.com/v2/prices/${currency}/spot?`;
    const { data } = await axios(url);
    let formattedSpotPrices = { keys: COINS.keys };

    data.data
        .filter((item) => COINS.keys.indexOf(item.base) >= 0)
        .forEach((item) => {
            formattedSpotPrices[item.base] = {
                price: +item.amount
            };
        });

    return formattedSpotPrices;
};

const fetchCoinIcon = async (coin) => {
    const iconSvg = await import(`cryptocurrency-icons/128/color/${coin.toLowerCase()}.png`);
    return iconSvg.default;
};

export { fetchPriceHistory, fetchSpotPrice, fetchCoinIcon };
