import axios from 'axios';
import { DURATIONS } from '../constants/constants';
import moment from 'moment';

//const url = 'https://crypto-visualizer-api.herokuapp.com/data/v2';
const historicalDataURL = 'https://crypto-visualizer-api.herokuapp.com/data/v2';
const prefix_day = '/histoday';
const prefix_hour = '/histohour';
const prefix_minute = '/histominute';
//const url = 'http://localhost:2345/data/v';

const transformHistoryData = (dataArr) => {
    return dataArr.map(({ high, low, time }) => ({
        time: moment.unix(time), // original time si unix time
        price: (high + low) / 2 //take average price
    }));
};

const convertDateToTimestamp = (date) => {
    return parseInt((date.getTime() / 1000).toFixed(0));
};

const convertDurationToDate = (duration) => {
    //['HOUR', 'DAY', 'WEEK', 'MONTH', 'YEAR', 'ALL']
    let date = moment();
    switch (duration) {
        case 'HOUR':
            date.subtract('hours', 1);
            break;
        case 'DAY':
            date.subtract('hours', 24);
            break;
        case 'WEEK':
            date.subtract('days', 7);
            break;
        case 'MONTH':
            date.subtract('months', 1);
            break;
        case 'YEAR':
            date.subtract('years', 1);
            break;
        default:
            date.subtract('years', 10);
            break;
    }
    return date;
};

const dataWithinDuration = (data, duration) => {
    const date = convertDurationToDate(duration);
    const filteredData = data.filter(({ time }) => time > date);
    console.log(duration, date);
    console.log(filteredData.length);
    console.log(data.length);
    return filteredData;
};

const fetchPriceHistory = async (coin, currency = 'USD', duration = 'DAY') => {
    let url = historicalDataURL;
    switch (duration) {
        case 'HOUR':
            url += prefix_minute;
            break;
        case 'DAY':
            url += prefix_minute;
            break;
        case 'WEEK':
            url += prefix_hour;
            break;
        default:
            url += prefix_day;
            break;
    }

    const { data } = await axios(url, {
        params: {
            fsym: coin,
            tsym: currency,
            allData: true,
            limit: 2000
        },
        headers: {
            'Access-Control-Allow-Headers': 'X-Requested-Width'
        }
    });
    return transformHistoryData(data.Data.Data);
};

export { fetchPriceHistory, dataWithinDuration };
