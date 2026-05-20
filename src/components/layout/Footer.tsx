import Link from 'next/link';
import Logo from '@/components/ui/Logo';
import { ArrowRight } from 'lucide-react';

const FOOTER_LINKS = {
  Plataforma: ['Exchange', 'Trading Pro', 'DeFi', 'API'],
  Empresa: ['Nosotros', 'Blog', 'Carreras', 'Prensa'],
};

const SOCIALS = [
  { label: 'Twitter', path: 'M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.4 5.2 3.9 8.4 4-.3-1.4 0-3 .9-4.2A4.2 4.2 0 0 1 22 4z' },
  { label: 'LinkedIn', path: 'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7H10V9h4v2a6 6 0 0 1 2-3zM2 9h4v12H2z', extra: '<circle cx="4" cy="4" r="2"/>' },
  { label: 'Telegram', path: 'M22 2 11 13M22 2 15 22l-4-9-9-4 20-7z' },
  { label: 'Instagram', path: 'M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z M9 12a3 3 0 1 0 6 0 3 3 0 0 0-6 0' },
];

export default function Footer() {
  return (
    <footer className="footer" style={{ background: 'var(--bg2)', borderTop: '1px solid var(--border)', padding: '48px 32px 24px' }}>
      <div style={{ maxWidth: 1080, margin: '0 auto' }}>
        <div className="footer-grid" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1.5fr', gap: 32, marginBottom: 40 }}>
          {/* Brand */}
          <div>
            <Link href="/" style={{ textDecoration: 'none' }}>
              <Logo width={150} />
            </Link>
            <p style={{ fontSize: 13, color: 'var(--text3)', lineHeight: 1.65, marginBottom: 18, maxWidth: 240 }}>
              La plataforma de trading cripto más avanzada de Latinoamérica. Opera con confianza.
            </p>
            <div style={{ display: 'flex', gap: 7 }}>
              {SOCIALS.map(({ label }) => (
                <button key={label} aria-label={label} style={{
                  width: 32, height: 32, borderRadius: 8,
                  background: 'var(--bg3)', border: '1px solid var(--border)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', color: 'var(--text3)', transition: 'all 0.18s',
                }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                  </svg>
                </button>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(FOOTER_LINKS).map(([group, links]) => (
            <div key={group}>
              <h4 style={{
                fontSize: 11, fontWeight: 700, textTransform: 'uppercase',
                letterSpacing: '0.6px', color: 'var(--text3)', marginBottom: 14,
              }}>
                {group}
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 9 }}>
                {links.map(link => (
                  <li key={link}>
                    <Link href="#" style={{ fontSize: 13, color: 'var(--text2)', textDecoration: 'none', transition: 'color 0.15s' }}>
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter */}
          <div>
            <h4 style={{
              fontSize: 11, fontWeight: 700, textTransform: 'uppercase',
              letterSpacing: '0.6px', color: 'var(--text3)', marginBottom: 10,
            }}>
              Newsletter
            </h4>
            <p style={{ fontSize: 12.5, color: 'var(--text3)', lineHeight: 1.55, marginBottom: 12 }}>
              Recibe análisis de mercado semanales directo a tu inbox.
            </p>
            <div style={{ display: 'flex', gap: 7 }}>
              <input
                type="email" placeholder="tu@email.com"
                style={{
                  flex: 1, background: 'var(--bg3)', border: '1px solid var(--border)',
                  color: 'var(--text)', padding: '0 12px', height: 36,
                  borderRadius: 8, fontSize: 13, outline: 'none', fontFamily: 'inherit',
                }}
              />
              <button style={{
                height: 36, width: 36, borderRadius: 8,
                background: 'linear-gradient(135deg, var(--cyan2), var(--violet))',
                border: 'none', color: '#fff', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="footer-bottom" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 20, borderTop: '1px solid var(--border)' }}>
          <p style={{ fontSize: 12, color: 'var(--text3)' }}>
            © 2026 Antares Technologies Inc. Todos los derechos reservados.
          </p>
          <div style={{ display: 'flex', gap: 16 }}>
            {['Privacidad', 'Términos', 'Cookies'].map(item => (
              <Link key={item} href="#" style={{ fontSize: 12, color: 'var(--text3)', textDecoration: 'none', transition: 'color 0.15s' }}>
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
