export async function GET() {
    try {
        const symbols = ['BTCUSDT', 'ETHUSDT', 'SOLUSDT', 'BNBUSDT', 'ADAUSDT', 'XRPUSDT', 'DOTUSDT', 'MATICUSDT', 'AVAXUSDT', 'LINKUSDT'];

        const res = await fetch(
            `https://api.binance.com/api/v3/ticker/24hr?symbols=${JSON.stringify(symbols)}`,
            { next: { revalidate: 30 } } // cache 30 segundos
        );

        const data = await res.json();

        const prices = data.map((t: any) => ({
            s: t.symbol.replace('USDT', ''),
            p: parseFloat(t.lastPrice),
            c: parseFloat(t.priceChangePercent),
        }));

        return Response.json(prices);
    } catch {
        return Response.json({ error: 'Error fetching prices' }, { status: 500 });
    }
}