import axios from 'axios';

const transformHistoryData = (dataArr) => {
    return dataArr.map(({ time, price }) => ({
        time: new Date(time),
        price: +price // convert to number
    }));
};

const fetchPriceHistory = async (coin, currency = 'USD', duration = 'DAY') => {
    const url = `https://www.coinbase.com/api/v2/prices/${coin.toLowerCase()}-${currency.toLowerCase()}/historic?period=${duration.toLowerCase()}`;
    const { data } = await axios(url);

    return transformHistoryData(data.data.prices);
};

export { fetchPriceHistory };
