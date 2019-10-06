import currencyFormatter from 'currency-formatter';

export const formatCurrency = (price, currencyCode, precision = 0) => {
    return currencyFormatter.format(price, {
        code: currencyCode.toUpperCase(),
        precision: precision
    });
};
