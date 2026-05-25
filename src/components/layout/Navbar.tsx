'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Menu, X, ArrowRight, LogIn } from 'lucide-react';
import { useTheme } from '@/lib/theme-context';
import { NAV_LINKS } from '@/lib/constants';
import Logo from '@/components/ui/Logo';
import { createPortal } from 'react-dom';


export default function Navbar() {
  const { theme, toggle } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <nav
        className="nav-inner"
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
          height: 60,
          width: '100%',
          maxWidth: '100vw',
          background: scrolled ? 'var(--bg2)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
          transition: 'all 0.3s ease',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 32px',
        }}
      >

        <Link href="/" style={{ textDecoration: 'none' }}>
          <Logo width={150} />
        </Link>

        {/* Desktop links */}
        <ul
          style={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex', gap: 8, listStyle: 'none', margin: 0, padding: 0,
          }}
          className="hidden-mobile"
        >
          {NAV_LINKS.map(({ href, label }) => {
            const active = pathname === href;
            return (
              <li key={href}>
                <Link
                  href={href}
                  style={{
                    display: 'flex', alignItems: 'center',
                    textDecoration: 'none',
                    fontSize: 15, fontWeight: 600,
                    color: active ? 'var(--text)' : 'var(--text2)',
                    padding: '8px 16px',
                    borderRadius: 8,
                    background: active ? 'var(--bg3)' : 'transparent',
                    transition: 'all 0.18s',
                  }}
                  onMouseEnter={e => { if (!active) (e.currentTarget as HTMLAnchorElement).style.color = 'var(--text)'; }}
                  onMouseLeave={e => { if (!active) (e.currentTarget as HTMLAnchorElement).style.color = 'var(--text2)'; }}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Right actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {/* Theme toggle */}
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            style={{
              width: 34, height: 34, borderRadius: 8,
              background: 'var(--bg3)', border: '1px solid var(--border)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', transition: 'all 0.18s', color: 'var(--text2)',
            }}
          >
            {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
          </button>

          {/* Login */}
          <button
            className="hidden-mobile"
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              background: 'transparent', border: '1px solid var(--border)',
              color: 'var(--text2)', padding: '0 16px', height: 34,
              borderRadius: 8, cursor: 'pointer', fontSize: 13,
              transition: 'all 0.18s',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--borderac)';
              (e.currentTarget as HTMLButtonElement).style.color = 'var(--text)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border)';
              (e.currentTarget as HTMLButtonElement).style.color = 'var(--text2)';
            }}
          >
            <LogIn size={13} /> Iniciar sesión
          </button>

          {/* CTA */}
          <button
            className="hidden-mobile"
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              background: 'linear-gradient(135deg, var(--cyan2), var(--violet))',
              border: 'none', color: '#fff',
              padding: '0 18px', height: 34, borderRadius: 8,
              cursor: 'pointer', fontSize: 13, fontWeight: 600,
              transition: 'opacity 0.18s',
            }}
            onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.opacity = '0.85'}
            onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.opacity = '1'}
          >
            Empezar <ArrowRight size={13} />
          </button>

          {/* Mobile hamburger */}
          <button
            className="show-mobile"
            onClick={() => setMobileOpen(o => !o)}
            style={{
              width: 34, height: 34, borderRadius: 8,
              background: 'var(--bg3)', border: '1px solid var(--border)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: 'var(--text2)',
            }}
          >
            {mobileOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {typeof window !== 'undefined' && createPortal(
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              style={{
                position: 'fixed', top: 60, left: 0, right: 0, zIndex: 99,
                background: 'var(--bg2)', borderBottom: '1px solid var(--border)',
                padding: '16px 16px 24px',
              }}
            >
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 2, marginBottom: 16, }}>
                {NAV_LINKS.map(({ href, label }) => {
                  const active = pathname === href;
                  return (
                    <li key={href}>
                      <Link
                        href={href}
                        onClick={() => setMobileOpen(false)}
                        style={{
                          display: 'block',
                          padding: '14px 12px',        // ← más padding vertical
                          borderRadius: 8,
                          textDecoration: 'none',
                          color: active ? 'var(--cyan)' : 'var(--text2)',
                          background: active ? 'var(--bg3)' : 'transparent',
                          fontWeight: active ? 600 : 400,
                          fontSize: 15,
                          borderBottom: '1px solid var(--border)',  // ← separador
                          transition: 'all 0.15s',
                        }}
                      >
                        {label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <button
                style={{
                  width: '100%', height: 44, borderRadius: 10,
                  background: 'linear-gradient(135deg, var(--cyan2), var(--violet))',
                  border: 'none', color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer',
                }}
              >
                Crear cuenta gratis
              </button>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}

      {/* Spacer */}
      <div style={{ height: 60 }} />

      <style>{`
  .hidden-mobile { }
  .show-mobile { display: none !important; }

  @media (max-width: 768px) {
    .hidden-mobile { display: none !important; }
    .show-mobile { display: flex !important; }
    .nav-inner { padding: 0 16px !important; }
  }
`}</style>
    </>
  );
}
