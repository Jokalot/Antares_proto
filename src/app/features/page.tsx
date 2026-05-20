'use client';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { BarChart2, Grid, Lock, Home, Smartphone, Clock } from 'lucide-react';

const ALL_FEATURES = [
  { title: 'Charts avanzados', desc: 'Análisis técnico con más de 100 indicadores. TradingView integrado de forma nativa.', color: '#22D3EE', icon: BarChart2 },
  { title: 'API REST & WebSocket', desc: 'Conecta tu sistema con latencia inferior a 1ms. Documentación completa incluida.', color: '#8B5CF6', icon: Grid },
  { title: 'Seguro de activos', desc: 'Primeros $250,000 asegurados contra hackeos. Auditorías trimestrales certificadas.', color: '#10B981', icon: Lock },
  { title: 'DeFi integrado', desc: 'Accede a los mejores protocolos DeFi directamente desde tu cuenta Antares.', color: '#FBBF24', icon: Home },
  { title: 'App móvil nativa', desc: 'iOS y Android con funcionalidad completa. Alertas push en tiempo real.', color: '#F87171', icon: Smartphone },
  { title: 'Trading automatizado', desc: 'Bots con estrategias predefinidas o crea las tuyas. Backtesting incluido.', color: '#22D3EE', icon: Clock },
];

export default function FeaturesPage() {
  return (
    <>
      <section className="features-page-hero" style={{ padding: '72px 32px', background: 'var(--bg2)', borderBottom: '1px solid var(--border)', textAlign: 'center' }}>
        <ScrollReveal>
          <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.8px', color: 'var(--cyan)', marginBottom: 14, display: 'block' }}>
            Capacidades
          </span>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(34px, 5vw, 56px)', fontWeight: 800,
            letterSpacing: '-2.5px', marginBottom: 18, lineHeight: 1.06,
          }}>
            Todo lo que necesitas para{' '}
            <span style={{ background: 'linear-gradient(135deg, var(--cyan), var(--violet))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              ganar
            </span>
          </h1>
          <p style={{ fontSize: 17, color: 'var(--text2)', maxWidth: 500, margin: '0 auto', lineHeight: 1.65 }}>
            Herramientas profesionales accesibles para todos los niveles.
          </p>
        </ScrollReveal>
      </section>

      <section className="features-page-section" style={{ padding: '72px 32px' }}>
        <div style={{ maxWidth: 1080, margin: '0 auto' }}>
          <div className="features-page-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
            {ALL_FEATURES.map((f, i) => {
              const Icon = f.icon;
              return (
                <ScrollReveal key={i} delay={i * 0.08}>
                  <div style={{
                    background: 'var(--bg2)', border: '1px solid var(--border)',
                    borderRadius: 16, padding: 28, transition: 'all 0.22s',
                  }}
                    onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = `${f.color}44`; (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-3px)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border)'; (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'; }}
                  >
                    <div style={{ width: 52, height: 52, borderRadius: 13, background: `${f.color}18`, color: f.color, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18 }}>
                      <Icon size={22} strokeWidth={1.8} />
                    </div>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700, marginBottom: 8, letterSpacing: '-0.3px' }}>{f.title}</h3>
                    <p style={{ fontSize: 13.5, color: 'var(--text2)', lineHeight: 1.6 }}>{f.desc}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
