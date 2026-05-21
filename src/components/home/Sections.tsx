'use client';
import { Zap, Shield, Percent } from 'lucide-react';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { STATS, FEATURES, HOW_STEPS, TESTIMONIALS } from '@/lib/constants';

const ICONS: Record<string, React.ReactNode> = {
  zap: <Zap size={20} />,
  shield: <Shield size={20} />,
  percent: <Percent size={20} />,
};

/* ─── Stats ─────────────────────────────────────────────────── */
export function StatsRow() {
  return (
    <div className="stats-grid" style={{
      display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', background: 'var(--border)',
      borderTop: '1px solid var(--border)',
      borderBottom: '1px solid var(--border)',
    }}>
      {STATS.map((s, i) => (
        <ScrollReveal key={i} delay={i * 0.08}>
          <div style={{ background: 'var(--bg2)', padding: '28px 32px', textAlign: 'center' }}>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: 36, fontWeight: 800, letterSpacing: '-1.5px',
              marginBottom: 4, lineHeight: 1,
              background: 'linear-gradient(135deg, var(--cyan), var(--violet))',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>
              {s.value}
            </div>
            <div style={{ fontSize: 12.5, color: 'var(--text3)', fontWeight: 500 }}>{s.label}</div>
          </div>
        </ScrollReveal>
      ))}
    </div>
  );
}

/* ─── Features ───────────────────────────────────────────────── */
export function FeaturesSection() {
  return (
    <section className="features-section" style={{ padding: '72px 32px' }}>
      <div style={{ maxWidth: 1080, margin: '0 auto' }}>
        <ScrollReveal>
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <span style={{
              fontSize: 11, fontWeight: 700, textTransform: 'uppercase',
              letterSpacing: '0.8px', color: 'var(--cyan)', marginBottom: 10, display: 'block',
            }}>
              Por qué Antares
            </span>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 800,
              letterSpacing: '-1.5px', marginBottom: 10,
            }}>
              Construido para{' '}
              <span style={{
                background: 'linear-gradient(135deg, var(--cyan), var(--violet))',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>
                profesionales
              </span>
            </h2>
            <p style={{ fontSize: 15, color: 'var(--text2)', maxWidth: 440, margin: '0 auto', lineHeight: 1.6 }}>
              Tecnología institucional con una experiencia de usuario excepcional.
            </p>
          </div>
        </ScrollReveal>

        <div className="features-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          {FEATURES.map((f, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <div
                style={{
                  background: 'var(--bg2)', border: '1px solid var(--border)',
                  borderRadius: 16, padding: 24, transition: 'all 0.22s', cursor: 'default',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.borderColor = `${f.color}44`;
                  el.style.transform = 'translateY(-3px)';
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.borderColor = 'var(--border)';
                  el.style.transform = 'translateY(0)';
                }}
              >
                <div style={{
                  width: 44, height: 44, borderRadius: 11,
                  background: `${f.color}18`,
                  color: f.color,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: 16,
                }}>
                  {ICONS[f.icon]}
                </div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 700, marginBottom: 7, letterSpacing: '-0.2px' }}>
                  {f.title}
                </h3>
                <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.6 }}>{f.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── How It Works ───────────────────────────────────────────── */
export function HowItWorks() {
  return (
    <section className="how-section" style={{ padding: '72px 32px', background: 'var(--bg2)' }}>


      {/* Fondo decorativo */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        backgroundImage: `radial-gradient(circle, rgba(59,130,246,0.07) 1px, transparent 1px)`,
        backgroundSize: '28px 28px',
        pointerEvents: 'none',
      }} />


      <div style={{ maxWidth: 1080, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <ScrollReveal>
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <span style={{
              fontSize: 11, fontWeight: 700, textTransform: 'uppercase',
              letterSpacing: '0.8px', color: 'var(--cyan)', marginBottom: 10, display: 'block',
            }}>
              Proceso
            </span>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 800, letterSpacing: '-1.5px', marginBottom: 10,
            }}>
              Cuatro pasos para{' '}
              <span style={{
                background: 'linear-gradient(135deg, var(--cyan), var(--violet))',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>
                empezar
              </span>
            </h2>
            <p style={{ fontSize: 15, color: 'var(--text2)', maxWidth: 400, margin: '0 auto', lineHeight: 1.6 }}>
              Operando en menos de 5 minutos desde que te registras.
            </p>
          </div>
        </ScrollReveal>

        <div className="how-steps" style={{ display: 'flex', position: 'relative', gap: 12 }}>
          {HOW_STEPS.map((step, i) => (
            <ScrollReveal
              key={i}
              delay={i * 0.15}
              style={{ flex: 1, position: 'relative' }}
            >
              {i < HOW_STEPS.length - 1 && (
                <div className="how-connector" style={{
                  position: 'absolute', top: 33, right: -26,
                  zIndex: 2,
                  display: 'flex', alignItems: 'center', gap: 2,
                }}>
                  <div style={{ width: 40, height: 2, background: 'var(--cyan2)', opacity: 0.5 }} />
                  <span style={{ color: 'var(--cyan2)', opacity: 0.8, fontSize: 32, lineHeight: 1 }}>›</span>
                </div>
              )}
              <div style={{
                background: 'var(--bg)', border: '1px solid var(--border)',
                borderRadius: 16, padding: '28px 20px', textAlign: 'center',
                transition: 'all 0.22s', height: '100%', position: 'relative',
              }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--borderac)';
                  (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-3px)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border)';
                  (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
                }}
              >
                <div style={{
                  width: 44, height: 44, borderRadius: '50%',
                  background: 'var(--bg3)', border: '1px solid var(--borderac)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 16px',
                  fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 800, color: 'var(--cyan)',
                }}>
                  {step.n}
                </div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 700, marginBottom: 8 }}>
                  {step.title}
                </h3>
                <p style={{ fontSize: 12.5, color: 'var(--text2)', lineHeight: 1.55 }}>{step.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Testimonials ───────────────────────────────────────────── */
export function Testimonials() {
  return (
    <section className="testimonials-section" style={{ padding: '72px 32px' }}>
      <div style={{ maxWidth: 1080, margin: '0 auto' }}>
        <ScrollReveal>
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <span style={{
              fontSize: 11, fontWeight: 700, textTransform: 'uppercase',
              letterSpacing: '0.8px', color: 'var(--cyan)', marginBottom: 10, display: 'block',
            }}>
              Comunidad
            </span>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 800, letterSpacing: '-1.5px',
            }}>
              Lo que dicen nuestros{' '}
              <span style={{
                background: 'linear-gradient(135deg, var(--cyan), var(--violet))',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>
                usuarios
              </span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="testimonials-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          {TESTIMONIALS.map((t, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <div style={{
                background: 'var(--bg2)', border: '1px solid var(--border)',
                borderRadius: 16, padding: 22, height: '100%',
              }}>
                <div style={{ display: 'flex', gap: 3, marginBottom: 12 }}>
                  {[...Array(5)].map((_, j) => (
                    <svg key={j} width="13" height="13" viewBox="0 0 12 12">
                      <polygon
                        points="6,1 7.5,4.5 11,5 8.5,7.5 9,11 6,9.5 3,11 3.5,7.5 1,5 4.5,4.5"
                        fill={j < t.stars ? '#FBBF24' : 'var(--bg4)'}
                      />
                    </svg>
                  ))}
                </div>
                <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.65, marginBottom: 18 }}>
                  {t.text}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{
                    width: 34, height: 34, borderRadius: '50%', flexShrink: 0,
                    background: `linear-gradient(135deg, ${t.from}, ${t.to})`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 11, fontWeight: 800, color: '#fff',
                  }}>
                    {t.initials}
                  </div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700 }}>{t.name}</div>
                    <div style={{ fontSize: 11.5, color: 'var(--text3)' }}>{t.role}</div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
