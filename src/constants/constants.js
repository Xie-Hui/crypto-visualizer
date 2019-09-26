// Supported cryptocurrencies
const COINS = {
    BTC: {
        key: 'btc',
        name: 'Bitcoin',
        fillColor: '#FFEBC5',
        strokeColor: '#FFB01E',
        icon: () => {}
    },
    BCH: {
        key: 'bch',
        name: 'Bitcoin Cash',
        fillColor: '#e2f0d2',
        strokeColor: '#8DC451',
        icon: () => {}
    },
    ETH: {
        key: 'eth',
        name: 'Ethereum',
        fillColor: '#F0F1F8',
        strokeColor: '#6E7CB9',
        icon: () => {}
    },
    LTC: {
        key: 'ltc',
        name: 'Litecoin',
        fillColor: '#ECECEC',
        strokeColor: '#B5B5B5',
        icon: () => {}
    },
    keys: ['BTC', 'BCH', 'ETH', 'LTC']
};

// Supported Currencies
const CURRENCY = {
    cad: { key: 'cad', name: 'Canadian Dollar' },
    usd: { key: 'usd', name: 'US Dollar' }
};

// Time duration constants
const DURATIONS = {
    HOUR: { key: 'hour', name: '1H', humanize: 'since an hour ago' },
    DAY: { key: 'day', name: '1D', humanize: 'since yesterday' },
    WEEK: { key: 'week', name: '1W', humanize: 'since last week' },
    MONTH: { key: 'month', name: '1M', humanize: 'since last month' },
    YEAR: { key: 'year', name: '1Y', humanize: 'since last year' },
    ALL: { key: 'all', name: 'ALL', humanize: '' },
    keys: ['HOUR', 'DAY', 'WEEK', 'MONTH', 'YEAR', 'ALL']
};

export { COINS, CURRENCY, DURATIONS };
