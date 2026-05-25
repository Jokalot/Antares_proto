import { useState, useEffect } from 'react';

interface Ticker {
    s: string;
    p: number;
    c: number;
}

export function usePrices() {
    const [tickers, setTickers] = useState<Ticker[]>([]);
    const [loading, setLoading] = useState(true);

    async function fetchPrices() {
        try {
            const res = await fetch('/api/prices');
            const data = await res.json();
            setTickers(data);
        } catch (err) {
            console.error('Error fetching prices:', err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchPrices();
        const id = setInterval(fetchPrices, 30000); // actualiza cada 30s
        return () => clearInterval(id);
    }, []);

    return { tickers, loading };
}