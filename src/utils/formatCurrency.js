import currencyFormatter from 'currency-formatter';

export const formatCurrency = (price, currencyCode) => {
    return currencyFormatter.format(price, {
        code: currencyCode.toUpperCase(),
        precision: 0
    });
};
