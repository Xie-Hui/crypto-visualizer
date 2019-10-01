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
            date.subtract('years', 6);
            break;
    }
    return date;
};

const binarySearch = (left, right, target, arr) => {
    let mid = (left + right) >> 1;

    if (mid === left || mid === right || (arr[mid].time <= target && arr[mid + 1].time > target)) {
        return mid;
    } else if (arr[mid].time > target) {
        return binarySearch(left, mid, target, arr);
    } else {
        return binarySearch(mid + 1, right, target, arr);
    }
};

const dataWithinDuration = (data, duration) => {
    const date = convertDurationToDate(duration);
    // binary search to locate index
    const index = binarySearch(0, data.length, date, data);
    const filteredData = data.slice(index);
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
            url += prefix_minute;
            break;
        case 'MONTH':
            url += prefix_hour;
            break;
        case 'YEAR':
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
            //aggregate: 5,
            //...(duration === 'ALL' && { allData: true }),
            ...(duration === 'ALL' && { aggregate: 1 }),
            ...(duration === 'YEAR' && { aggregate: 2 }),
            limit: 2000
        }
    });

    /* console.log(
        'time from: ',
        moment.unix(data.Data.TimeFrom).format('dddd, MMMM Do YYYY, h:mm:ss a')
    );
    console.log(
        'time to:   ',
        moment.unix(data.Data.TimeTo).format('dddd, MMMM Do YYYY, h:mm:ss a')
    ); */
    let transformedData = transformHistoryData([...data.Data.Data]);
    const targetData = dataWithinDuration(transformedData, duration);
    console.log('data points: ', targetData.length);
    return targetData;
};

export { fetchPriceHistory };
