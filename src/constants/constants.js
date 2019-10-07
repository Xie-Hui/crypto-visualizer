// Supported cryptocurrencies
const COINS = {
    BTC: { name: 'Bitcoin', fillColor: '#FFEBC5', strokeColor: '#FFB01E' },
    BCH: { name: 'Bitcoin Cash', fillColor: '#e2f0d2', strokeColor: '#8DC451' },
    ETH: { name: 'Ethereum', fillColor: '#F0F1F8', strokeColor: '#6E7CB9' },
    LTC: { name: 'Litecoin', fillColor: '#ECECEC', strokeColor: '#B5B5B5' },
    keys: ['BTC', 'BCH', 'ETH', 'LTC']
};

// Supported Currencies
const CURRENCY = {
    cad: { name: 'Canadian Dollar' },
    usd: { name: 'US Dollar' },
    keys: ['cad', 'usd']
};

// Time duration constants
const DURATIONS = {
    HOUR: { name: '1H', friendly: 'since an hour ago' },
    DAY: { name: '1D', friendly: 'since yesterday' },
    WEEK: { name: '1W', friendly: 'since last week' },
    MONTH: { name: '1M', friendly: 'since last month' },
    YEAR: { name: '1Y', friendly: 'since last year' },
    ALL: { name: 'ALL', friendly: 'all time' },
    keys: ['HOUR', 'DAY', 'WEEK', 'MONTH', 'YEAR', 'ALL']
};

const DEFAULT_TICK_COUNT = 7;
const POLL_FREQUENCY = 60 * 1000; //polling frequency

// chart
const CHART_PADDING_TOP = 20;
const CHART_PADDING_BOTTOM = 10;

export {
    COINS,
    CURRENCY,
    DURATIONS,
    DEFAULT_TICK_COUNT,
    CHART_PADDING_TOP,
    CHART_PADDING_BOTTOM,
    POLL_FREQUENCY
};
