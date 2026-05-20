'use client';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { TEAM } from '@/lib/constants';

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="about-hero" style={{ padding: '72px 32px', background: 'var(--bg2)', borderBottom: '1px solid var(--border)', textAlign: 'center' }}>
        <ScrollReveal>
          <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.8px', color: 'var(--cyan)', marginBottom: 14, display: 'block' }}>
            Nuestra historia
          </span>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(34px, 5vw, 56px)', fontWeight: 800,
            letterSpacing: '-2.5px', marginBottom: 18, lineHeight: 1.06,
          }}>
            Democratizando las{' '}
            <span style={{
              background: 'linear-gradient(135deg, var(--cyan), var(--violet))',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>
              finanzas digitales
            </span>
          </h1>
          <p style={{ fontSize: 17, color: 'var(--text2)', maxWidth: 560, margin: '0 auto', lineHeight: 1.65 }}>
            Fundada en 2021 por ex-ingenieros de Coinbase y Goldman Sachs con una misión clara: hacer el trading de criptomonedas accesible, seguro y rentable para todos.
          </p>
        </ScrollReveal>
      </section>

      {/* Team */}
      <section className="about-team-section" style={{ padding: '72px 32px' }}>
        <div style={{ maxWidth: 1080, margin: '0 auto' }}>
          <ScrollReveal>
            <div style={{ textAlign: 'center', marginBottom: 52 }}>
              <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.8px', color: 'var(--cyan)', marginBottom: 10, display: 'block' }}>Equipo</span>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 800, letterSpacing: '-1.5px' }}>
                Las personas detrás de{' '}
                <span style={{ background: 'linear-gradient(135deg, var(--cyan), var(--violet))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  Antares
                </span>
              </h2>
            </div>
          </ScrollReveal>
          <div className="team-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
            {TEAM.map((m, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div style={{
                  background: 'var(--bg2)', border: '1px solid var(--border)',
                  borderRadius: 16, padding: '28px 20px', textAlign: 'center',
                  transition: 'all 0.2s',
                }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-3px)'; (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(139,92,246,0.3)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border)'; }}
                >
                  <div style={{
                    width: 60, height: 60, borderRadius: '50%',
                    background: `linear-gradient(135deg, ${m.from}, ${m.to})`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 18, fontWeight: 800, color: '#fff', margin: '0 auto 14px',
                    fontFamily: 'var(--font-display)',
                  }}>
                    {m.initials}
                  </div>
                  <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 4, fontFamily: 'var(--font-display)' }}>{m.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--cyan)', fontWeight: 600, marginBottom: 6 }}>{m.role}</div>
                  <div style={{ fontSize: 11.5, color: 'var(--text3)' }}>{m.bio}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
