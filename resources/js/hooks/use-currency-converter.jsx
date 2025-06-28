// hooks/useCurrencyConverter.js
import { useEffect, useState } from 'react';

export default function useCurrencyConverter(baseAmount, discountedAmountOptions) {
    const [currency, setCurrency] = useState('NGN');
    const [rate, setRate] = useState(1);
    const [loading, setLoading] = useState(true);
    const [converted, setConverted] = useState({
        base: baseAmount,
        discounted: discountedAmountOptions,
    });

    useEffect(() => {
        const detectCurrencyAndConvert = async () => {
            try {
                const res = await fetch('https://ipapi.co/json');
                const location = await res.json();
                const userCurrency = location.currency || 'NGN';
                setCurrency(userCurrency);

                if (userCurrency !== 'NGN') {
                    const rateRes = await fetch(route('exchange-rate'));
                    const rateData = await rateRes.json();
                    const newRate = rateData.conversion_rates[userCurrency] || 1;
                    setRate(newRate);

                    setConverted({
                        base: parseFloat((baseAmount * newRate).toFixed(2)),
                        discounted: {
                            ...Object.fromEntries(
                                Object.entries(discountedAmountOptions || {}).map(([key, val]) => [
                                    key,
                                    parseFloat((val * newRate).toFixed(2)),
                                ])
                            ),
                        },
                    });
                }

                setLoading(false);
            } catch (error) {
                console.error('Currency conversion failed:', error);
                setLoading(false);
            }
        };

        detectCurrencyAndConvert();
    }, []);

    const formatter = new Intl.NumberFormat(undefined, {
        style: 'currency',
        currency,
        currencyDisplay: 'symbol',
        maximumFractionDigits: 2,
    });

    return { currency, rate, loading, formatter, converted };
}
