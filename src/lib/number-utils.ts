export const toCurrency = (number?: number) =>
    new Intl.NumberFormat('de-AT', {
        style: 'currency',
        currency: 'EUR',
        currencyDisplay: 'code',
    })
        .format(number || 0)
        .replace('EUR', '')
        .trim();
