'use client';
import { TICKERS } from '@/lib/constants';

export default function TickerBar() {
  const items = [...TICKERS, ...TICKERS];

  return (
    <div style={{
      overflow: 'hidden',
      borderTop: '1px solid var(--border)',
      borderBottom: '1px solid var(--border)',
      padding: '10px 0',
      background: 'var(--bg2)',
    }}>
      <div className="ticker-track" style={{
        display: 'flex',
        width: 'max-content',
        animation: 'ticker 35s linear infinite',
      }}>
        {items.map((t, i) => {
          const up = t.c >= 0;
          return (
            <div key={i} className="ticker-item" style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '0 20px', fontSize: 12.5, whiteSpace: 'nowrap' }}>
              <span style={{ fontWeight: 700, color: 'var(--text)', fontFamily: 'var(--font-display)' }}>
                {t.s}
              </span>
              <span style={{ color: 'var(--text2)' }}>
                ${t.p.toLocaleString()}
              </span>
              <span style={{ color: up ? 'var(--green)' : 'var(--red)', fontSize: 11, fontWeight: 600 }}>
                {up ? '▲' : '▼'}{Math.abs(t.c)}%
              </span>
              <span style={{ width: 1, height: 14, background: 'var(--border)', display: 'inline-block', marginLeft: 8 }} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
