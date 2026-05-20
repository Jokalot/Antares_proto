'use client';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { Send, MessageCircle, Mail, Phone } from 'lucide-react';

const INFO = [
  { icon: MessageCircle, label: 'Live Chat', val: 'Respuesta en 5 min' },
  { icon: Mail,          label: 'Email',     val: 'hola@antares.io' },
  { icon: Phone,         label: 'Teléfono',  val: 'Lun–Vie 9–18h' },
];

export default function ContactPage() {
  return (
    <>
      <section style={{ padding: '72px 32px', background: 'var(--bg2)', borderBottom: '1px solid var(--border)', textAlign: 'center' }}>
        <ScrollReveal>
          <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.8px', color: 'var(--cyan)', marginBottom: 14, display: 'block' }}>
            Contacto
          </span>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(34px, 5vw, 56px)', fontWeight: 800,
            letterSpacing: '-2.5px', marginBottom: 18, lineHeight: 1.06,
          }}>
            Hablemos de{' '}
            <span style={{ background: 'linear-gradient(135deg, var(--cyan), var(--violet))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              tu proyecto
            </span>
          </h1>
          <p style={{ fontSize: 17, color: 'var(--text2)', maxWidth: 460, margin: '0 auto', lineHeight: 1.65 }}>
            Nuestro equipo responde en menos de 2 horas en días hábiles.
          </p>
        </ScrollReveal>
      </section>

      <section style={{ padding: '72px 32px' }}>
        <div style={{ maxWidth: 580, margin: '0 auto' }}>
          <ScrollReveal>
            <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 18, padding: 32 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
                {[
                  { label: 'Nombre', placeholder: 'Tu nombre completo', type: 'text' },
                  { label: 'Email',  placeholder: 'tu@email.com',        type: 'email' },
                ].map(f => (
                  <div key={f.label}>
                    <label style={{ display: 'block', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text3)', marginBottom: 7 }}>
                      {f.label}
                    </label>
                    <input
                      type={f.type}
                      placeholder={f.placeholder}
                      style={{
                        width: '100%', background: 'var(--bg3)', border: '1px solid var(--border)',
                        color: 'var(--text)', padding: '10px 14px', borderRadius: 10,
                        fontSize: 14, outline: 'none', fontFamily: 'inherit', transition: 'border-color 0.18s',
                      }}
                      onFocus={e => (e.currentTarget as HTMLInputElement).style.borderColor = 'var(--borderac)'}
                      onBlur={e => (e.currentTarget as HTMLInputElement).style.borderColor = 'var(--border)'}
                    />
                  </div>
                ))}
              </div>

              <div style={{ marginBottom: 14 }}>
                <label style={{ display: 'block', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text3)', marginBottom: 7 }}>Asunto</label>
                <select style={{
                  width: '100%', background: 'var(--bg3)', border: '1px solid var(--border)',
                  color: 'var(--text)', padding: '10px 14px', borderRadius: 10,
                  fontSize: 14, outline: 'none', fontFamily: 'inherit', cursor: 'pointer',
                  transition: 'border-color 0.18s',
                }}
                  onFocus={e => (e.currentTarget as HTMLSelectElement).style.borderColor = 'var(--borderac)'}
                  onBlur={e => (e.currentTarget as HTMLSelectElement).style.borderColor = 'var(--border)'}
                >
                  <option>Soporte técnico</option>
                  <option>Ventas Enterprise</option>
                  <option>API / Integración</option>
                  <option>Otro</option>
                </select>
              </div>

              <div style={{ marginBottom: 20 }}>
                <label style={{ display: 'block', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text3)', marginBottom: 7 }}>Mensaje</label>
                <textarea
                  rows={4}
                  placeholder="Cuéntanos cómo podemos ayudarte..."
                  style={{
                    width: '100%', background: 'var(--bg3)', border: '1px solid var(--border)',
                    color: 'var(--text)', padding: '10px 14px', borderRadius: 10,
                    fontSize: 14, outline: 'none', fontFamily: 'inherit',
                    resize: 'vertical', lineHeight: 1.55, transition: 'border-color 0.18s',
                  }}
                  onFocus={e => (e.currentTarget as HTMLTextAreaElement).style.borderColor = 'var(--borderac)'}
                  onBlur={e => (e.currentTarget as HTMLTextAreaElement).style.borderColor = 'var(--border)'}
                />
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
                Enviar mensaje <Send size={14} />
              </button>
            </div>
          </ScrollReveal>

          {/* Info cards */}
          <ScrollReveal delay={0.1}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginTop: 14 }}>
              {INFO.map(({ icon: Icon, label, val }) => (
                <div key={label} style={{
                  background: 'var(--bg3)', border: '1px solid var(--border)',
                  borderRadius: 11, padding: 16, textAlign: 'center',
                }}>
                  <Icon size={18} style={{ color: 'var(--cyan)', marginBottom: 8 }} strokeWidth={1.8} />
                  <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 3 }}>{label}</div>
                  <div style={{ fontSize: 11.5, color: 'var(--text3)' }}>{val}</div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
