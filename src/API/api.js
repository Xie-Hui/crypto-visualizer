import axios from 'axios';

//const url = 'https://crypto-visualizer-api.herokuapp.com/data/v2';
const url = 'https://crypto-visualizer-api.herokuapp.com/data/v2/histoday';
//const url = 'http://localhost:2345/data/v';

const transformHistoryData = (dataArr) => {
    return dataArr.map(({ high, low, time }) => ({
        time: new Date(time * 1000), // original time si unix time
        price: (high + low) / 2 //take average price
    }));
};

const fetchPriceHistory = async (coin, currency = 'USD') => {
    const { data } = await axios.get(url, {
        params: {
            fsym: coin,
            tsym: currency,
            allData: true,
            //aggregate: 1,
            limit: 10
        }
    });
    return transformHistoryData(data.Data.Data);
};

export { fetchPriceHistory };
