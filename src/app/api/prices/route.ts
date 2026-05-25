export async function GET() {
    try {
        const symbols = ['BTCUSDT', 'ETHUSDT', 'SOLUSDT', 'BNBUSDT', 'ADAUSDT', 'XRPUSDT', 'DOTUSDT', 'MATICUSDT', 'AVAXUSDT', 'LINKUSDT'];

        // Usamos CoinGecko en lugar de Binance — funciona en Vercel
        const ids = 'bitcoin,ethereum,solana,binancecoin,cardano,ripple,polkadot,matic-network,avalanche-2,chainlink';
        const res = await fetch(
            `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true`,
            { next: { revalidate: 30 } }
        );

        const data = await res.json();

        const MAP: Record<string, string> = {
            bitcoin: 'BTC', ethereum: 'ETH', solana: 'SOL',
            binancecoin: 'BNB', cardano: 'ADA', ripple: 'XRP',
            polkadot: 'DOT', 'matic-network': 'MATIC',
            'avalanche-2': 'AVAX', chainlink: 'LINK',
        };

        const prices = Object.entries(data).map(([id, val]: [string, any]) => ({
            s: MAP[id],
            p: val.usd,
            c: val.usd_24h_change,
        }));

        return Response.json(prices);
    } catch (err) {
        return Response.json({ error: 'Error fetching prices' }, { status: 500 });
    }
}