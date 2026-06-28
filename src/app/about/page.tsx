'use client';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { TEAM, COMPANY } from '@/lib/constants';
import { Shield, Globe, Users, Handshake } from 'lucide-react';

const WHY_US = [
  { icon: Shield, title: 'Seguridad primero', desc: 'Priorizamos la seguridad de tus activos cripto por encima de todo.', color: '#3B82F6' },
  { icon: Globe, title: 'Alcance global', desc: 'Servimos a una comunidad global de entusiastas de las criptomonedas.', color: '#10B981' },
  { icon: Users, title: 'Interfaz intuitiva', desc: 'Ya seas principiante o trader experto, nuestra plataforma hace todo más fácil.', color: '#8B5CF6' },
  { icon: Handshake, title: 'Cumplimiento y confianza', desc: 'Cumplimos estrictos estándares regulatorios AML/KYC para tu tranquilidad.', color: '#F59E0B' },
];

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
            Seguridad, simplicidad y{' '}
            <span style={{
              background: 'linear-gradient(135deg, var(--cyan), var(--violet))',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>
              excelencia
            </span>
          </h1>
          <p style={{ fontSize: 17, color: 'var(--text2)', maxWidth: 600, margin: '0 auto', lineHeight: 1.65 }}>
            {COMPANY.slogan}
          </p>
        </ScrollReveal>
      </section>

      {/* Misión y Visión */}
      <section style={{ padding: '72px 32px' }}>
        <div style={{ maxWidth: 1080, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, alignItems: 'stretch' }}>
          <ScrollReveal style={{ height: '100%' }}>
            <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 18, padding: 32, height: '100%' }}>
              <span style={{ fontSize: 16, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.8px', color: 'var(--cyan)', marginBottom: 12, display: 'block' }}>
                Nuestra misión
              </span>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 800, letterSpacing: '-0.5px', marginBottom: 14 }}>
                Comerciante institucional de activos virtuales
              </h2>
              <p style={{ fontSize: 14, color: 'var(--text2)', lineHeight: 1.7 }}>
                {COMPANY.mision}
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1} style={{ height: '100%' }}>
            <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 18, padding: 32, height: '100%' }}>
              <span style={{ fontSize: 16, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.8px', color: 'var(--violet)', marginBottom: 12, display: 'block' }}>
                Nuestra visión
              </span>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 800, letterSpacing: '-0.5px', marginBottom: 14 }}>
                Arbitraje sistemático en exchanges centralizados
              </h2>
              <p style={{ fontSize: 14, color: 'var(--text2)', lineHeight: 1.7 }}>
                {COMPANY.vision}
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Quiénes somos */}
      <section style={{ padding: '0 32px 72px' }}>
        <div style={{ maxWidth: 1080, margin: '0 auto' }}>
          <ScrollReveal>
            <div style={{ background: 'linear-gradient(135deg, rgba(59,130,246,0.08), rgba(139,92,246,0.08))', border: '1px solid var(--border)', borderRadius: 18, padding: 40, textAlign: 'center' }}>
              <span style={{ fontSize: 16, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.8px', color: 'var(--cyan)', marginBottom: 12, display: 'block' }}>
                Quiénes somos
              </span>
              <p style={{ fontSize: 16, color: 'var(--text2)', maxWidth: 680, margin: '0 auto', lineHeight: 1.7 }}>
                {COMPANY.quienesSomos}
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Por qué elegirnos */}
      <section style={{ padding: '72px 32px', background: 'var(--bg2)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: 1080, margin: '0 auto' }}>
          <ScrollReveal>
            <div style={{ textAlign: 'center', marginBottom: 52 }}>
              <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.8px', color: 'var(--cyan)', marginBottom: 10, display: 'block' }}>
                Por qué elegirnos
              </span>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 800, letterSpacing: '-1.5px' }}>
                ¿Por qué invertir en{' '}
                <span style={{ background: 'linear-gradient(135deg, var(--cyan), var(--violet))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  Antares?
                </span>
              </h2>
            </div>
          </ScrollReveal>

          <div className="team-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, alignItems: 'stretch' }}>
            {WHY_US.map((w, i) => {
              const Icon = w.icon;
              return (
                <ScrollReveal key={i} delay={i * 0.1} style={{ height: '100%' }}>
                  <div style={{
                    background: 'var(--bg)', border: '1px solid var(--border)',
                    borderRadius: 16, padding: '28px 20px', textAlign: 'center',
                    transition: 'all 0.2s', height: '100%',
                  }}
                    onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-3px)'; (e.currentTarget as HTMLDivElement).style.borderColor = `${w.color}44`; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border)'; }}
                  >
                    <div style={{
                      width: 52, height: 52, borderRadius: '50%',
                      background: `${w.color}18`, color: w.color,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      margin: '0 auto 16px',
                    }}>
                      <Icon size={22} strokeWidth={1.8} />
                    </div>
                    <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 8, fontFamily: 'var(--font-display)' }}>{w.title}</div>
                    <div style={{ fontSize: 12.5, color: 'var(--text3)', lineHeight: 1.6 }}>{w.desc}</div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
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
          <div className="team-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, alignItems: 'stretch' }}>
            {TEAM.map((m, i) => (
              <ScrollReveal key={i} delay={i * 0.1} style={{ height: '100%' }}>
                <div style={{
                  background: 'var(--bg2)', border: '1px solid var(--border)',
                  borderRadius: 16, padding: '28px 20px', textAlign: 'center',
                  transition: 'all 0.2s', height: '100%',
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