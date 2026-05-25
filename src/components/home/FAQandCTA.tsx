'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, ArrowRight, FileText } from 'lucide-react';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { FAQS } from '@/lib/constants';

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => { setIsMobile(window.innerWidth <= 768); }, []);
  return isMobile;
}

export function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);
  const isMobile = useIsMobile();

  return (
    <section className="faq-section" style={{ padding: '72px 32px', background: 'var(--bg2)' }}>
      <div style={{ maxWidth: 1080, margin: '0 auto' }}>
        <ScrollReveal>
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <span style={{
              fontSize: 11, fontWeight: 700, textTransform: 'uppercase',
              letterSpacing: '0.8px', color: 'var(--cyan)', marginBottom: 10, display: 'block',
            }}>
              FAQ
            </span>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 800, letterSpacing: '-1.5px',
            }}>
              Preguntas{' '}
              <span style={{
                background: 'linear-gradient(135deg, var(--cyan), var(--violet))',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>
                frecuentes
              </span>
            </h2>
          </div>
        </ScrollReveal>

        <div style={{ maxWidth: 660, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 6 }}>
          {FAQS.map((faq, i) => (
            <div key={i} className="faq-item" style={{
              background: 'var(--bg)', border: '1px solid',
              borderColor: open === i ? 'rgba(139,92,246,0.3)' : 'var(--border)',
              borderRadius: 12, overflow: 'hidden',
              transition: 'border-color 0.2s',
            }}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                style={{
                  width: '100%', background: 'none', border: 'none',
                  color: 'var(--text)', padding: '15px 20px',
                  textAlign: 'left', fontSize: 14, fontWeight: 600,
                  cursor: 'pointer', display: 'flex', justifyContent: 'space-between',
                  alignItems: 'center', gap: 12, letterSpacing: '-0.1px',
                  fontFamily: 'var(--font-body)',
                }}
              >
                {faq.q}
                {isMobile ? (
                  <div style={{
                    flexShrink: 0,
                    color: open === i ? 'var(--violet)' : 'var(--text3)',
                    transform: open === i ? 'rotate(45deg)' : 'rotate(0deg)',
                    transition: 'transform 0.22s, color 0.22s',
                  }}>
                    <Plus size={16} />
                  </div>
                ) : (
                  <motion.div
                    animate={{ rotate: open === i ? 45 : 0 }}
                    transition={{ duration: 0.22 }}
                    style={{ flexShrink: 0, color: open === i ? 'var(--violet)' : 'var(--text3)' }}
                  >
                    <Plus size={16} />
                  </motion.div>
                )}
              </button>

              {isMobile ? (
                open === i && (
                  <div style={{ overflow: 'hidden' }}>
                    <div className="faq-item-body" style={{ padding: '0 20px 16px', borderTop: '1px solid var(--border)' }}>
                      <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.65, paddingTop: 12 }}>
                        {faq.a}
                      </p>
                    </div>
                  </div>
                )
              ) : (
                <AnimatePresence initial={false}>
                  {open === i && (
                    <motion.div
                      key="body"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div className="faq-item-body" style={{ padding: '0 20px 16px', borderTop: '1px solid var(--border)' }}>
                        <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.65, paddingTop: 12 }}>
                          {faq.a}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CTASection() {
  return (
    <section className="cta-section" style={{ padding: '72px 32px' }}>
      <div style={{ maxWidth: 1080, margin: '0 auto' }}>
        <ScrollReveal>
          <div className="cta-card" style={{
            background: 'var(--bg2)', borderRadius: 22, padding: '60px 40px', textAlign: 'center',
            maxWidth: 680, margin: '0 auto', position: 'relative', overflow: 'hidden',
          }}>
            {/* Decorative glow */}
            <div style={{
              position: 'absolute', top: -100, left: '50%', transform: 'translateX(-50%)',
              width: 500, height: 250,
              background: 'radial-gradient(ellipse, rgba(139,92,246,0.12) 0%, transparent 70%)',
              pointerEvents: 'none',
            }} />

            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(32px, 4.5vw, 46px)', fontWeight: 800,
              letterSpacing: '-2px', marginBottom: 14, lineHeight: 1.08,
              position: 'relative',
            }}>
              Listo para{' '}
              <span style={{
                background: 'linear-gradient(135deg, var(--cyan), var(--violet))',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>
                despegar
              </span>
              ?
            </h2>
            <p style={{ fontSize: 15, color: 'var(--text2)', marginBottom: 32, position: 'relative' }}>
              Más de 1.8 millones de traders ya confían en Antares.
            </p>

            <div className="cta-buttons" style={{ display: 'flex', gap: 10, justifyContent: 'center', position: 'relative' }}>
              <button style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '0 24px', height: 46, borderRadius: 11,
                background: 'linear-gradient(135deg, var(--cyan2), var(--violet))',
                border: 'none', color: '#fff', fontSize: 14.5, fontWeight: 700,
                cursor: 'pointer', transition: 'opacity 0.18s',
                fontFamily: 'var(--font-display)',
              }}
                onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.opacity = '0.87'}
                onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.opacity = '1'}
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
                <FileText size={14} /> Ver planes
              </button>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
