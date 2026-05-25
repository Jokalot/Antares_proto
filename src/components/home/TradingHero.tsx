"use client";

import { useEffect, useRef, useState, useCallback } from "react";

// ── Types ────────────────────────────────────────────────────────────────────

interface Candle {
    o: number;
    c: number;
    h: number;
    l: number;
    t: string;
}

interface Ticker {
    symbol: string;
    price: number;
    change: number;
}

interface Order {
    side: "buy" | "sell";
    price: number;
    qty: number;
    time: string;
}

// ── Constants ────────────────────────────────────────────────────────────────

const TICKERS_STATIC: Ticker[] = [
    { symbol: "BTC", price: 97420, change: 2.4 },
    { symbol: "ETH", price: 3280, change: 1.8 },
    { symbol: "SOL", price: 142, change: 5.1 },
    { symbol: "BNB", price: 412, change: -0.9 },
    { symbol: "XRP", price: 0.61, change: -1.1 },
    { symbol: "AVAX", price: 38.2, change: 3.4 },
    { symbol: "MATIC", price: 0.88, change: 2.7 },
    { symbol: "LINK", price: 14.6, change: 1.9 },
];

const INITIAL_CANDLES: Candle[] = [
    { o: 88, c: 72, h: 94, l: 68, t: "13:00" },
    { o: 72, c: 80, h: 84, l: 70, t: "13:05" },
    { o: 80, c: 76, h: 88, l: 74, t: "13:10" },
    { o: 76, c: 90, h: 93, l: 74, t: "13:15" },
    { o: 90, c: 85, h: 96, l: 83, t: "13:20" },
    { o: 85, c: 92, h: 98, l: 83, t: "13:25" },
    { o: 92, c: 88, h: 100, l: 86, t: "13:30" },
    { o: 88, c: 95, h: 102, l: 86, t: "13:35" },
    { o: 95, c: 91, h: 104, l: 89, t: "13:40" },
    { o: 91, c: 98, h: 106, l: 89, t: "13:45" },
    { o: 98, c: 94, h: 108, l: 92, t: "13:50" },
    { o: 94, c: 102, h: 110, l: 92, t: "13:55" },
    { o: 102, c: 99, h: 112, l: 97, t: "14:00" },
    { o: 99, c: 107, h: 114, l: 97, t: "14:05" },
    { o: 107, c: 104, h: 116, l: 102, t: "14:10" },
    { o: 104, c: 112, h: 118, l: 102, t: "14:15" },
    { o: 112, c: 108, h: 120, l: 106, t: "14:20" },
    { o: 108, c: 115, h: 122, l: 106, t: "14:25" },
    { o: 115, c: 118, h: 124, l: 112, t: "14:30" },
    { o: 118, c: 112, h: 126, l: 110, t: "14:35" },
];

const INITIAL_ORDERS: Order[] = [
    { side: "buy", price: 97380, qty: 0.024, time: "14:32" },
    { side: "sell", price: 97410, qty: 0.011, time: "14:31" },
    { side: "buy", price: 97290, qty: 0.052, time: "14:29" },
    { side: "sell", price: 97510, qty: 0.007, time: "14:28" },
];

const TIMEFRAMES = ["1h", "4h", "1d"] as const;
type Timeframe = (typeof TIMEFRAMES)[number];

// ── Helpers ──────────────────────────────────────────────────────────────────

function fmt(n: number, decimals = 2) {
    return n.toLocaleString("en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
    });
}

function fmtPrice(n: number) {
    return n >= 1 ? fmt(n, 2) : fmt(n, 4);
}

// ── Sub-components ───────────────────────────────────────────────────────────

function LiveDot({ color = "#1D9E75" }: { color?: string }) {
    return (
        <span
            style={{ background: color }}
            className="inline-block w-2 h-2 rounded-full animate-pulse"
        />
    );
}

function CandleChart({ candles }: { candles: Candle[] }) {
    const W = 320;
    const H = 120;
    const minV = Math.min(...candles.map((c) => c.l)) - 5;
    const maxV = Math.max(...candles.map((c) => c.h)) + 5;
    const range = maxV - minV;
    const scaleY = (v: number) => H - ((v - minV) / range) * (H - 6);

    const cw = 11;
    const gap = 4;
    const total = candles.length * (cw + gap);
    const startX = Math.max(0, W - total);

    return (
        <svg width="100%" viewBox={`0 0 ${W} ${H}`} className="overflow-visible">
            {[0, 0.33, 0.66, 1].map((t, i) => (
                <line
                    key={i}
                    x1={0}
                    y1={scaleY(minV + range * (1 - t))}
                    x2={W}
                    y2={scaleY(minV + range * (1 - t))}
                    stroke="currentColor"
                    strokeWidth={0.5}
                    strokeDasharray={i === 0 || i === 3 ? "0" : "3 3"}
                    className="text-border"
                    opacity={0.3}
                />
            ))}
            {candles.map((d, i) => {
                const x = startX + i * (cw + gap);
                const up = d.c >= d.o;
                const top = scaleY(Math.max(d.o, d.c));
                const bot = scaleY(Math.min(d.o, d.c));
                const ht = Math.max(bot - top, 1.5);
                const mx = x + cw / 2;
                const color = up ? "#1D9E75" : "#E24B4A";
                return (
                    <g key={i}>
                        <line
                            x1={mx}
                            y1={scaleY(d.h)}
                            x2={mx}
                            y2={scaleY(d.l)}
                            stroke={color}
                            strokeWidth={1}
                        />
                        <rect
                            x={x}
                            y={top}
                            width={cw}
                            height={ht}
                            fill={color}
                            rx={1}
                        />
                    </g>
                );
            })}
        </svg>
    );
}

function TickerBar({ tickers }: { tickers: Ticker[] }) {
    const doubled = [...tickers, ...tickers];
    return (
        <div className="overflow-hidden border-b border-border bg-background">
            <div
                className="flex gap-8 py-2 px-4 whitespace-nowrap"
                style={{
                    animation: "ticker 30s linear infinite",
                    display: "flex",
                    width: "max-content",
                }}
            >
                {doubled.map((t, i) => (
                    <span key={i} className="flex items-center gap-2 text-sm">
                        {i === 0 && <LiveDot />}
                        <span className="font-medium text-foreground">{t.symbol}</span>
                        <span className="text-foreground">${fmtPrice(t.price)}</span>
                        <span
                            style={{ color: t.change >= 0 ? "#1D9E75" : "#E24B4A" }}
                        >
                            {t.change >= 0 ? "+" : ""}
                            {t.change.toFixed(1)}%
                        </span>
                    </span>
                ))}
            </div>
        </div>
    );
}

// ── Main component ───────────────────────────────────────────────────────────

export default function TradingHero() {
    const [btcPrice, setBtcPrice] = useState(97420);
    const [btcChange, setBtcChange] = useState(2.4);
    const [tickers, setTickers] = useState<Ticker[]>(TICKERS_STATIC);
    const [candles, setCandles] = useState<Candle[]>(INITIAL_CANDLES);
    const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
    const [timeframe, setTimeframe] = useState<Timeframe>("1h");
    const [buyQty, setBuyQty] = useState("0.001");
    const baseRef = useRef(97420);

    // Simulated price tick — swap this for a real WebSocket/API call
    const tick = useCallback(() => {
        const delta = (Math.random() - 0.48) * 120;
        baseRef.current = Math.round(baseRef.current + delta);
        const base = baseRef.current;
        const pct = parseFloat(((base / 94000 - 1) * 100).toFixed(2));

        setBtcPrice(base);
        setBtcChange(pct);

        // Append a new candle periodically (every ~5 ticks in real use)
        if (Math.random() < 0.2) {
            setCandles((prev) => {
                const last = prev[prev.length - 1];
                const now = new Date();
                const newCandle: Candle = {
                    o: last.c,
                    c: Math.round(last.c + (Math.random() - 0.5) * 400),
                    h: Math.round(last.c + Math.random() * 300 + 50),
                    l: Math.round(last.c - Math.random() * 300 - 50),
                    t: `${now.getHours()}:${String(now.getMinutes()).padStart(2, "0")}`,
                };
                return [...prev.slice(-19), newCandle];
            });
        }

        // Prepend a fake live order
        if (Math.random() < 0.3) {
            const side: "buy" | "sell" = Math.random() > 0.5 ? "buy" : "sell";
            const now = new Date();
            const newOrder: Order = {
                side,
                price: base + (Math.random() > 0.5 ? 1 : -1) * Math.round(Math.random() * 60),
                qty: parseFloat((Math.random() * 0.08 + 0.005).toFixed(3)),
                time: `${now.getHours()}:${String(now.getMinutes()).padStart(2, "0")}`,
            };
            setOrders((prev) => [newOrder, ...prev.slice(0, 3)]);
        }
    }, []);

    useEffect(() => {
        const id = setInterval(tick, 2000);
        return () => clearInterval(id);
    }, [tick]);

    // TODO: Replace simulation with real data
    // useEffect(() => {
    //   const ws = new WebSocket("wss://stream.binance.com:9443/ws/btcusdt@trade");
    //   ws.onmessage = (e) => {
    //     const data = JSON.parse(e.data);
    //     setBtcPrice(parseFloat(data.p));
    //   };
    //   return () => ws.close();
    // }, []);

    const spread = 1.5;
    const buyTotal = (parseFloat(buyQty) * btcPrice).toFixed(2);

    return (
        <section className="w-full" style={{ paddingTop: 60 }}>
            {/* Ticker */}
            <style>{`
        @keyframes ticker {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

            <TickerBar tickers={tickers} />

            {/* Hero grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[520px]">

                {/* ── Left: copy ── */}
                <div className="flex flex-col justify-center px-8 py-14 lg:px-16 border-r border-border">
                    <div className="flex items-center gap-2 mb-6">
                        <LiveDot />
                        <span className="text-xs font-medium text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 border border-emerald-200 dark:border-emerald-800 px-3 py-1 rounded-full">
                            Mercado abierto · 24h
                        </span>
                    </div>

                    <h1 className="text-4xl lg:text-5xl font-medium leading-tight mb-4 text-foreground">
                        Opera cripto a<br />
                        <span className="text-muted-foreground">velocidad estelar</span>
                    </h1>

                    <p className="text-muted-foreground mb-8 max-w-md leading-relaxed">
                        Compra, vende e intercambia más de 200 criptomonedas con las
                        comisiones más bajas y seguridad de nivel institucional.
                    </p>

                    <div className="flex gap-3 mb-10">
                        <button className="bg-foreground text-background px-6 py-2.5 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
                            Crear cuenta gratis
                        </button>
                        <button className="border border-border px-6 py-2.5 rounded-lg text-sm hover:bg-muted transition-colors">
                            Ver demo
                        </button>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                        {[
                            { label: "Volumen 24h", value: "$2.4B" },
                            { label: "Usuarios", value: "1.8M+" },
                            { label: "Comisión", value: "0.1%", green: true },
                        ].map(({ label, value, green }) => (
                            <div key={label} className="bg-muted rounded-lg p-3">
                                <p className="text-xs text-muted-foreground mb-1">{label}</p>
                                <p
                                    className="text-base font-medium"
                                    style={{ color: green ? "#1D9E75" : undefined }}
                                >
                                    {value}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── Right: dashboard ── */}
                <div className="flex flex-col bg-background border-l border-border divide-y divide-border">

                    {/* Pair header */}
                    <div className="flex items-center justify-between px-4 py-3">
                        <div className="flex items-center gap-3">
                            <span className="font-medium text-sm">BTC / USDT</span>
                            <span
                                className="text-xl font-medium tabular-nums"
                                style={{ color: btcChange >= 0 ? "#1D9E75" : "#E24B4A" }}
                            >
                                ${btcPrice.toLocaleString()}
                            </span>
                            <span
                                className="text-sm"
                                style={{ color: btcChange >= 0 ? "#1D9E75" : "#E24B4A" }}
                            >
                                {btcChange >= 0 ? "+" : ""}
                                {btcChange.toFixed(2)}%
                            </span>
                        </div>
                        <div className="flex bg-muted rounded-lg p-0.5 gap-0.5">
                            {TIMEFRAMES.map((tf) => (
                                <button
                                    key={tf}
                                    onClick={() => setTimeframe(tf)}
                                    className={`px-3 py-1 text-xs rounded-md transition-colors ${timeframe === tf
                                        ? "bg-background text-foreground font-medium shadow-sm"
                                        : "text-muted-foreground hover:text-foreground"
                                        }`}
                                >
                                    {tf}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Chart */}
                    <div className="px-4 py-3 flex-1">
                        <CandleChart candles={candles} />
                    </div>

                    {/* Order panels */}
                    <div className="grid grid-cols-2 divide-x divide-border">
                        {/* Buy */}
                        <div className="px-4 py-3 space-y-2">
                            <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
                                Comprar BTC
                            </p>
                            <div className="space-y-1.5 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Precio</span>
                                    <span className="font-medium tabular-nums" style={{ color: "#1D9E75" }}>
                                        {btcPrice.toLocaleString()}.00
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-muted-foreground">Cantidad</span>
                                    <input
                                        type="number"
                                        value={buyQty}
                                        onChange={(e) => setBuyQty(e.target.value)}
                                        className="w-24 text-right bg-muted rounded px-2 py-0.5 text-sm tabular-nums border-0 outline-none"
                                        step="0.001"
                                        min="0.001"
                                    />
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Total</span>
                                    <span className="tabular-nums">${buyTotal}</span>
                                </div>
                            </div>
                            <button
                                className="w-full py-2 rounded-lg text-sm font-medium text-white transition-opacity hover:opacity-90"
                                style={{ background: "#1D9E75" }}
                            >
                                Comprar
                            </button>
                        </div>

                        {/* Sell */}
                        <div className="px-4 py-3 space-y-2">
                            <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
                                Vender BTC
                            </p>
                            <div className="space-y-1.5 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Precio</span>
                                    <span className="font-medium tabular-nums" style={{ color: "#E24B4A" }}>
                                        {(btcPrice - spread).toLocaleString("en-US", {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2,
                                        })}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Disponible</span>
                                    <span className="tabular-nums">0.045 BTC</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Total</span>
                                    <span className="tabular-nums">
                                        ${fmt((btcPrice - spread) * 0.045)}
                                    </span>
                                </div>
                            </div>
                            <button
                                className="w-full py-2 rounded-lg text-sm font-medium text-white transition-opacity hover:opacity-90"
                                style={{ background: "#E24B4A" }}
                            >
                                Vender
                            </button>
                        </div>
                    </div>

                    {/* Recent orders */}
                    <div className="px-4 py-3">
                        <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider mb-2">
                            Órdenes recientes
                        </p>
                        <div className="space-y-1.5">
                            {orders.map((o, i) => (
                                <div
                                    key={i}
                                    className="flex justify-between items-center text-xs"
                                >
                                    <span
                                        className="font-medium w-12"
                                        style={{ color: o.side === "buy" ? "#1D9E75" : "#E24B4A" }}
                                    >
                                        {o.side === "buy" ? "Compra" : "Venta"}
                                    </span>
                                    <span className="tabular-nums text-muted-foreground">
                                        ${o.price.toLocaleString()}
                                    </span>
                                    <span className="tabular-nums text-muted-foreground">
                                        {o.qty.toFixed(3)} BTC
                                    </span>
                                    <span className="text-muted-foreground/60">{o.time}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}