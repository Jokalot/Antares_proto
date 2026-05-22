'use client';
import { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play, ArrowUpDown, RefreshCw, ChevronDown } from 'lucide-react';
import { COINS } from '@/lib/constants';
import { usePrices } from '@/lib/usePrices';

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => { setIsMobile(window.innerWidth <= 768); }, []);
  return isMobile;
}

interface Candle {
  o: number; c: number; h: number; l: number; t: string;
}

const INITIAL_CANDLES: Candle[] = [
  { o: 88, c: 72, h: 94, l: 68, t: '13:00' },
  { o: 72, c: 80, h: 84, l: 70, t: '13:05' },
  { o: 80, c: 76, h: 88, l: 74, t: '13:10' },
  { o: 76, c: 90, h: 93, l: 74, t: '13:15' },
  { o: 90, c: 85, h: 96, l: 83, t: '13:20' },
  { o: 85, c: 92, h: 98, l: 83, t: '13:25' },
  { o: 92, c: 88, h: 100, l: 86, t: '13:30' },
  { o: 88, c: 95, h: 102, l: 86, t: '13:35' },
  { o: 95, c: 91, h: 104, l: 89, t: '13:40' },
  { o: 91, c: 98, h: 106, l: 89, t: '13:45' },
  { o: 98, c: 94, h: 108, l: 92, t: '13:50' },
  { o: 94, c: 102, h: 110, l: 92, t: '13:55' },
];


function CandleChart({ candles }: { candles: Candle[] }) {
  const W = 300;
  const H = 160;
  const minV = Math.min(...candles.map(c => c.l)) - 5;
  const maxV = Math.max(...candles.map(c => c.h)) + 5;
  const range = maxV - minV;
  const scaleY = (v: number) => H - ((v - minV) / range) * (H - 6);
  const cw = 16;
  const gap = 4;
  const total = candles.length * (cw + gap);
  const startX = Math.max(0, W - total);

  return (
    <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ overflow: 'visible' }}>
      {[0.25, 0.5, 0.75].map((t, i) => (
        <line
          key={i}
          x1={0} y1={scaleY(minV + range * t)}
          x2={W} y2={scaleY(minV + range * t)}
          stroke="rgba(255,255,255,0.06)"
          strokeWidth={1}
          strokeDasharray="3 3"
        />
      ))}
      {candles.map((d, i) => {
        const x = startX + i * (cw + gap);
        const up = d.c >= d.o;
        const top = scaleY(Math.max(d.o, d.c));
        const bot = scaleY(Math.min(d.o, d.c));
        const ht = Math.max(bot - top, 1.5);
        const mx = x + cw / 2;
        const color = up ? '#10B981' : '#F87171';
        return (
          <g key={i}>
            <line x1={mx} y1={scaleY(d.h)} x2={mx} y2={scaleY(d.l)} stroke={color} strokeWidth={1} />
            <rect x={x} y={top} width={cw} height={ht} fill={color} rx={2} />
          </g>
        );
      })}
    </svg>
  );
}


type CoinId = typeof COINS[number]['id'];

const CALC_TABS = [
  { id: 'exchange', label: 'Exchange' },
  { id: 'buy', label: 'Comprar' },
  { id: 'sell', label: 'Vender' },
] as const;

function CoinSelector({
  value, onChange, exclude,
}: {
  value: CoinId;
  onChange: (id: CoinId) => void;
  exclude: CoinId;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const coin = COINS.find(c => c.id === value)!;
  const options = COINS.filter(c => c.id !== exclude);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          display: 'flex', alignItems: 'center', gap: 7,
          background: 'var(--bg3)', border: '1px solid var(--border)',
          color: 'var(--text)', padding: '0 12px', height: 44,
          borderRadius: 10, cursor: 'pointer', fontSize: 13, fontWeight: 700,
          whiteSpace: 'nowrap', transition: 'border-color 0.18s',
          borderColor: open ? 'var(--borderac)' : 'var(--border)',
        }}
      >
        <div style={{
          width: 22, height: 22, borderRadius: '50%',
          background: coin.color,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 10, fontWeight: 800, color: '#fff',
        }}>
          {coin.sym}
        </div>
        {coin.id}
        <ChevronDown
          size={13}
          style={{
            color: 'var(--text3)',
            transition: 'transform 0.2s',
            transform: open ? 'rotate(180deg)' : 'rotate(0)',
          }}
        />
      </button>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -6, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          style={{
            position: 'absolute', top: 'calc(100% + 6px)', right: 0,
            background: 'var(--bg2)', border: '1px solid var(--border)',
            borderRadius: 12, padding: 4, minWidth: 170, zIndex: 50,
            boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
          }}
        >
          {options.map(opt => (
            <button
              key={opt.id}
              onClick={() => { onChange(opt.id as CoinId); setOpen(false); }}
              style={{
                display: 'flex', alignItems: 'center', gap: 9,
                width: '100%', padding: '9px 12px', borderRadius: 8,
                background: opt.id === value ? 'var(--bg3)' : 'transparent',
                border: 'none', cursor: 'pointer',
                color: opt.id === value ? 'var(--cyan)' : 'var(--text)',
                fontSize: 13, fontWeight: 600, textAlign: 'left',
                transition: 'background 0.15s',
              }}
              onMouseEnter={e => {
                if (opt.id !== value) (e.currentTarget as HTMLButtonElement).style.background = 'var(--bg3)';
              }}
              onMouseLeave={e => {
                if (opt.id !== value) (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
              }}
            >
              <div style={{
                width: 22, height: 22, borderRadius: '50%',
                background: opt.color,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 10, fontWeight: 800, color: '#fff', flexShrink: 0,
              }}>
                {opt.sym}
              </div>
              <span>{opt.id}</span>
              <span style={{ marginLeft: 'auto', fontSize: 11, color: 'var(--text3)', fontWeight: 400 }}>
                {opt.name}
              </span>
            </button>
          ))}
        </motion.div>
      )}
    </div>
  );
}

export default function HeroSection() {
  const isMobile = useIsMobile();

  const { tickers } = usePrices();
  // Precio real de BTC
  const liveBtcPrice = tickers.find(t => t.s === 'BTC')?.p ?? 95420;
  const liveBtcChange = tickers.find(t => t.s === 'BTC')?.c ?? 2.4;

  // Estados
  const [activeTab, setActiveTab] = useState<'exchange' | 'buy' | 'sell'>('exchange');
  const [fromCoin, setFromCoin] = useState<CoinId>('BTC');
  const [toCoin, setToCoin] = useState<CoinId>('USDT');
  const [fromAmt, setFromAmt] = useState('1');
  const [rotating, setRotating] = useState(false);
  const [btcPrice, setBtcPrice] = useState(95420);
  const [btcChange, setBtcChange] = useState(2.4);
  const [candles, setCandles] = useState<Candle[]>(INITIAL_CANDLES);
  const baseRef = useRef(liveBtcPrice); // ← usa el precio real como base

  const tick = useCallback(() => {
    const delta = (Math.random() - 0.48) * 120;
    baseRef.current = Math.round(baseRef.current + delta);
    const base = baseRef.current;
    const pct = parseFloat(((base / 94000 - 1) * 100).toFixed(2));
    setBtcPrice(base);
    setBtcChange(pct);

    if (Math.random() < 0.25) {
      setCandles(prev => {
        const last = prev[prev.length - 1];
        const now = new Date();
        const newCandle: Candle = {
          o: last.c,
          c: Math.round(last.c + (Math.random() - 0.5) * 300),
          h: Math.round(last.c + Math.random() * 200 + 30),
          l: Math.round(last.c - Math.random() * 200 - 30),
          t: `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`,
        };
        return [...prev.slice(-11), newCandle];
      });
    }
  }, []);

  useEffect(() => {
    const id = setInterval(tick, 2000);
    return () => clearInterval(id);
  }, [tick]);

  useEffect(() => {
    if (liveBtcPrice !== 95420) {
      setBtcPrice(liveBtcPrice);
      setBtcChange(liveBtcChange);
      baseRef.current = liveBtcPrice;
    }
  }, [liveBtcPrice]);

  const fromData = COINS.find(c => c.id === fromCoin)!;
  const toData = COINS.find(c => c.id === toCoin)!;

  const fromPrice = tickers.find(t => t.s === fromCoin)?.p ?? fromData.price;
  const toPrice = tickers.find(t => t.s === toCoin)?.p ?? toData.price;

  const rate = fromPrice / toPrice;
  const toAmt = (parseFloat(fromAmt) * rate || 0).toFixed(toCoin === 'USDT' ? 2 : 6);
  const rateStr = rate.toFixed(toCoin === 'USDT' ? 2 : 6);



  function swap() {
    setRotating(true);
    setTimeout(() => setRotating(false), 400);
    setFromCoin(toCoin);
    setToCoin(fromCoin);
  }

  const container = isMobile
    ? { hidden: {}, show: {} }
    : { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
  const item = isMobile
    ? { hidden: {}, show: {} }
    : {
      hidden: { opacity: 0, y: 28 },
      show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
    };

  return (
    <section className="hero-section" style={{ position: 'relative', padding: '40px 32px 48px', overflow: 'clip' }}>
      {/* Orbs */}
      <div className="orb" style={{ width: 500, height: 500, background: '#2563EB', top: -200, left: '10%' }} />
      <div className="orb" style={{ width: 400, height: 400, background: '#2563EB', top: -100, right: '5%' }} />

      <motion.div
        variants={container} initial="hidden" animate="show"
        className="hero-grid"
        style={{
          position: 'relative', zIndex: 1,
          maxWidth: 1200, margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: 32, alignItems: 'center',
        }}
      >
        {/* ── COL 1: copy ── */}
        <div>
          <motion.div variants={item} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 28 }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              background: 'rgba(34,211,238,0.08)', border: '1px solid rgba(34,211,238,0.22)',
              color: 'var(--cyan)', fontSize: 11.5, fontWeight: 600,
              padding: '5px 14px', borderRadius: 100, letterSpacing: '0.4px', textTransform: 'uppercase',
            }}>
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--cyan)', display: 'inline-block' }} />
              Una nueva forma de ver el exchange
            </div>
          </motion.div>

          <motion.h1 variants={item} style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(28px, 3vw, 46px)',
            fontWeight: 800, lineHeight: 1.06,
            letterSpacing: '-2px', marginBottom: 20, textAlign: 'left',
          }}>
            Opera cripto a<br />
            <span className="grad">velocidad estelar</span>
          </motion.h1>

          <motion.p variants={item} style={{
            fontSize: 15, color: 'var(--text2)',
            marginBottom: 36, lineHeight: 1.65, textAlign: 'left',
          }}>
            Compra, vende e intercambia más de 200 criptomonedas con las comisiones más bajas y seguridad de nivel institucional.
          </motion.p>

          <motion.div variants={item} className="hero-buttons" style={{ display: 'flex', gap: 10 }}>
            <button style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '0 24px', height: 46, borderRadius: 11,
              background: 'linear-gradient(135deg, var(--cyan2), var(--violet))',
              border: 'none', color: '#fff', fontSize: 14.5, fontWeight: 700,
              cursor: 'pointer', letterSpacing: '-0.2px', transition: 'all 0.2s',
              fontFamily: 'var(--font-display)',
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.opacity = '0.87'; (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-1px)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.opacity = '1'; (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)'; }}
            >
              Crear cuenta gratis <ArrowRight size={15} />
            </button>
            <button style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '0 22px', height: 46, borderRadius: 11,
              background: 'var(--bg3)', border: '1px solid var(--border)',
              color: 'var(--text2)', fontSize: 14.5, fontWeight: 600,
              cursor: 'pointer', transition: 'all 0.18s',
              fontFamily: 'var(--font-display)',
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--borderac)'; (e.currentTarget as HTMLButtonElement).style.color = 'var(--text)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border)'; (e.currentTarget as HTMLButtonElement).style.color = 'var(--text2)'; }}
            >
              <Play size={14} /> Ver demo
            </button>
          </motion.div>
        </div>

        {/* ── COL 2: dashboard ── */}
        <motion.div variants={item} className="hero-dashboard" style={{
          background: 'var(--bg2)', border: '1px solid var(--border)',
          borderRadius: 18, overflow: 'hidden',
        }}>
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '14px 18px', borderBottom: '1px solid var(--border)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--green)', display: 'inline-block' }} />
              <span style={{ fontSize: 13, fontWeight: 700, fontFamily: 'var(--font-display)' }}>BTC / USDT</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{
                fontSize: 16, fontWeight: 800, fontFamily: 'var(--font-display)',
                color: btcChange >= 0 ? 'var(--green)' : 'var(--red)',
              }}>
                ${btcPrice.toLocaleString()}
              </span>
              <span style={{
                fontSize: 11, fontWeight: 600, padding: '2px 7px', borderRadius: 6,
                background: btcChange >= 0 ? 'rgba(16,185,129,0.1)' : 'rgba(248,113,113,0.1)',
                color: btcChange >= 0 ? 'var(--green)' : 'var(--red)',
              }}>
                {btcChange >= 0 ? '+' : ''}{btcChange.toFixed(2)}%
              </span>
            </div>
          </div>

          <div style={{ padding: '16px 18px', borderBottom: '1px solid var(--border)' }}>
            <CandleChart candles={candles} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: '1px solid var(--border)' }}>
            {[
              { label: 'Comprar', color: 'var(--green)', bg: 'rgba(16,185,129,0.08)' },
              { label: 'Vender', color: 'var(--red)', bg: 'rgba(248,113,113,0.08)' },
            ].map(({ label, color, bg }) => (
              <div key={label} style={{ padding: '12px 14px', borderRight: label === 'Comprar' ? '1px solid var(--border)' : 'none' }}>
                <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text3)', marginBottom: 8 }}>{label} BTC</div>
                <div style={{ fontSize: 11, color: 'var(--text2)', marginBottom: 8 }}>
                  Precio: <span style={{ color, fontWeight: 700 }}>${btcPrice.toLocaleString()}</span>
                </div>
                <button style={{
                  width: '100%', height: 30, borderRadius: 8,
                  background: bg, border: `1px solid ${color}33`,
                  color, fontSize: 11, fontWeight: 700, cursor: 'pointer',
                  fontFamily: 'var(--font-display)',
                }}>
                  {label}
                </button>
              </div>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', padding: '10px 14px', gap: 8 }}>
            {[
              { label: 'Vol. 24h', value: '$2.4B' },
              { label: 'Máx. 24h', value: `$${(btcPrice + 800).toLocaleString()}` },
              { label: 'Mín. 24h', value: `$${(btcPrice - 1200).toLocaleString()}` },
            ].map(({ label, value }) => (
              <div key={label} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 10, color: 'var(--text3)', marginBottom: 3 }}>{label}</div>
                <div style={{ fontSize: 12, fontWeight: 700, fontFamily: 'var(--font-display)' }}>{value}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── COL 3: calculadora ── */}
        <motion.div variants={item} className="hero-calc">
          <div style={{
            background: 'var(--bg2)', border: '1px solid var(--border)',
            borderRadius: 18, padding: 24, textAlign: 'left',
          }}>
            <div style={{
              display: 'flex', gap: 2, background: 'var(--bg3)',
              border: '1px solid var(--border)', padding: 3,
              borderRadius: 11, marginBottom: 22,
            }}>
              {CALC_TABS.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    flex: 1, padding: '7px 12px',
                    borderRadius: 8, cursor: 'pointer', fontSize: 13, fontWeight: 500,
                    fontFamily: 'var(--font-body)',
                    background: activeTab === tab.id ? 'var(--bg2)' : 'transparent',
                    color: activeTab === tab.id ? 'var(--text)' : 'var(--text3)',
                    boxShadow: activeTab === tab.id ? '0 1px 4px rgba(0,0,0,0.3)' : 'none',
                    border: activeTab === tab.id ? '1px solid var(--border)' : '1px solid transparent',
                    transition: 'all 0.18s',
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div style={{ marginBottom: 8 }}>
              <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text3)', marginBottom: 7 }}>Envías</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 8, alignItems: 'center' }}>
                <input
                  type="number" value={fromAmt}
                  onChange={e => setFromAmt(e.target.value)}
                  style={{
                    background: 'var(--bg3)', border: '1px solid var(--border)',
                    color: 'var(--text)', padding: '10px 14px', borderRadius: 10,
                    fontSize: 20, fontWeight: 700, letterSpacing: '-0.5px',
                    outline: 'none', fontFamily: 'var(--font-display)', width: '100%',
                    transition: 'border-color 0.18s',
                  }}
                  onFocus={e => (e.currentTarget as HTMLInputElement).style.borderColor = 'var(--borderac)'}
                  onBlur={e => (e.currentTarget as HTMLInputElement).style.borderColor = 'var(--border)'}
                />
                <CoinSelector value={fromCoin} onChange={setFromCoin} exclude={toCoin} />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', margin: '6px 0' }}>
              <button onClick={swap} style={{
                width: 34, height: 34, borderRadius: '50%',
                background: 'var(--bg3)', border: '1px solid var(--border)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', color: 'var(--text2)', transition: 'all 0.25s',
                transform: rotating ? 'rotate(180deg)' : 'rotate(0deg)',
              }}
                onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--borderac)'}
                onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border)'}
              >
                <ArrowUpDown size={15} />
              </button>
            </div>

            <div style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text3)', marginBottom: 7 }}>Recibes</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 8, alignItems: 'center' }}>
                <input readOnly value={toAmt} style={{
                  background: 'var(--bg3)', border: '1px solid var(--border)',
                  color: 'var(--text)', padding: '10px 14px', borderRadius: 10,
                  fontSize: 20, fontWeight: 700, letterSpacing: '-0.5px',
                  outline: 'none', fontFamily: 'var(--font-display)', width: '100%',
                  opacity: 0.65, cursor: 'default',
                }} />
                <CoinSelector value={toCoin} onChange={setToCoin} exclude={fromCoin} />
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '10px 0', borderTop: '1px solid var(--border)', marginBottom: 14 }}>
              <RefreshCw size={12} style={{ color: 'var(--text3)' }} />
              <span style={{ fontSize: 12, color: 'var(--text3)' }}>
                Tasa: 1 {fromCoin} = <span style={{ color: 'var(--green)', fontWeight: 600 }}>{rateStr}</span> {toCoin}
              </span>
              <span style={{ marginLeft: 'auto', fontSize: 11.5, color: 'var(--green)', fontWeight: 600 }}>Sin comisiones ocultas</span>
            </div>

            <button style={{
              width: '100%', height: 44, borderRadius: 10,
              background: 'linear-gradient(135deg, var(--cyan2), var(--violet))',
              border: 'none', color: '#fff', fontSize: 14, fontWeight: 700,
              cursor: 'pointer', display: 'flex', alignItems: 'center',
              justifyContent: 'center', gap: 8, transition: 'opacity 0.18s',
              fontFamily: 'var(--font-display)',
            }}
              onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.opacity = '0.87'}
              onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.opacity = '1'}
            >
              Iniciar intercambio <ArrowRight size={14} />
            </button>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
