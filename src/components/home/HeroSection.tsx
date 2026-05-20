'use client';
import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play, ArrowUpDown, RefreshCw, ChevronDown } from 'lucide-react';
import { COINS } from '@/lib/constants';

type CoinId = typeof COINS[number]['id'];

const CALC_TABS = [
  { id: 'exchange', label: 'Exchange' },
  { id: 'buy',      label: 'Comprar' },
  { id: 'sell',     label: 'Vender' },
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
  const [activeTab, setActiveTab] = useState<'exchange' | 'buy' | 'sell'>('exchange');
  const [fromCoin, setFromCoin] = useState<CoinId>('BTC');
  const [toCoin, setToCoin]     = useState<CoinId>('USDT');
  const [fromAmt, setFromAmt]   = useState('1');
  const [rotating, setRotating] = useState(false);

  const fromData = COINS.find(c => c.id === fromCoin)!;
  const toData   = COINS.find(c => c.id === toCoin)!;
  const rate     = fromData.price / toData.price;
  const toAmt    = (parseFloat(fromAmt) * rate || 0).toFixed(toCoin === 'USDT' ? 2 : 6);
  const rateStr  = rate.toFixed(toCoin === 'USDT' ? 2 : 6);

  function swap() {
    setRotating(true);
    setTimeout(() => setRotating(false), 400);
    setFromCoin(toCoin);
    setToCoin(fromCoin);
  }

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1 } },
  };
  const item = {
    hidden: { opacity: 0, y: 28 },
    show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
  };

  return (
    <section style={{ position: 'relative', textAlign: 'center', padding: '80px 32px 64px', overflow: 'hidden' }}>
      {/* Orbs */}
      <div className="orb" style={{ width: 500, height: 500, background: 'var(--violet)', top: -200, left: '10%' }} />
      <div className="orb" style={{ width: 400, height: 400, background: 'var(--cyan2)', top: -100, right: '5%' }} />

      <motion.div variants={container} initial="hidden" animate="show" style={{ position: 'relative', zIndex: 1 }}>
        {/* Badge */}
        <motion.div variants={item} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 28 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            background: 'rgba(34,211,238,0.08)', border: '1px solid rgba(34,211,238,0.22)',
            color: 'var(--cyan)', fontSize: 11.5, fontWeight: 600,
            padding: '5px 14px', borderRadius: 100, letterSpacing: '0.4px', textTransform: 'uppercase',
          }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--cyan)', display: 'inline-block' }} />
            Nueva plataforma disponible
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1 variants={item} style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(38px, 5.5vw, 68px)',
          fontWeight: 800, lineHeight: 1.06,
          letterSpacing: '-3px', marginBottom: 20,
        }}>
          Opera cripto a<br />
          <span className="grad">velocidad estelar</span>
        </motion.h1>

        <motion.p variants={item} style={{
          fontSize: 17, color: 'var(--text2)', maxWidth: 520,
          margin: '0 auto 36px', lineHeight: 1.65,
        }}>
          Compra, vende e intercambia más de 200 criptomonedas con las comisiones más bajas y seguridad de nivel institucional.
        </motion.p>

        {/* Buttons */}
        <motion.div variants={item} style={{ display: 'flex', gap: 10, justifyContent: 'center', marginBottom: 56 }}>
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

        {/* Calculator Card */}
        <motion.div variants={item} style={{ maxWidth: 460, margin: '0 auto' }}>
          <div style={{
            background: 'var(--bg2)', border: '1px solid var(--border)',
            borderRadius: 18, padding: 24, textAlign: 'left',
          }}>
            {/* Tabs */}
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

            {/* From */}
            <div style={{ marginBottom: 8 }}>
              <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text3)', marginBottom: 7 }}>
                Envías
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 8, alignItems: 'center' }}>
                <input
                  type="number"
                  value={fromAmt}
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

            {/* Swap */}
            <div style={{ display: 'flex', justifyContent: 'center', margin: '6px 0' }}>
              <button
                onClick={swap}
                style={{
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

            {/* To */}
            <div style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text3)', marginBottom: 7 }}>
                Recibes
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 8, alignItems: 'center' }}>
                <input
                  readOnly
                  value={toAmt}
                  style={{
                    background: 'var(--bg3)', border: '1px solid var(--border)',
                    color: 'var(--text)', padding: '10px 14px', borderRadius: 10,
                    fontSize: 20, fontWeight: 700, letterSpacing: '-0.5px',
                    outline: 'none', fontFamily: 'var(--font-display)', width: '100%',
                    opacity: 0.65, cursor: 'default',
                  }}
                />
                <CoinSelector value={toCoin} onChange={setToCoin} exclude={fromCoin} />
              </div>
            </div>

            {/* Rate */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '10px 0', borderTop: '1px solid var(--border)', marginBottom: 14,
            }}>
              <RefreshCw size={12} style={{ color: 'var(--text3)' }} />
              <span style={{ fontSize: 12, color: 'var(--text3)' }}>
                Tasa: 1 {fromCoin} ={' '}
                <span style={{ color: 'var(--green)', fontWeight: 600 }}>{rateStr}</span>
                {' '}{toCoin}
              </span>
              <span style={{ marginLeft: 'auto', fontSize: 11.5, color: 'var(--green)', fontWeight: 600 }}>
                Sin comisiones ocultas
              </span>
            </div>

            {/* Submit */}
            <button
              style={{
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
