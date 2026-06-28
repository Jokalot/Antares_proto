'use client';
import { useState, FormEvent } from 'react';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { Send, MessageCircle, Mail, MapPin, Clock, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { COMPANY } from '@/lib/constants';

const INFO = [
  { icon: MessageCircle, label: 'Live Chat', val: 'Respuesta en 5 min', desc: 'Disponible 24/7' },
  { icon: Mail, label: 'Email', val: COMPANY.email, desc: 'Respondemos en menos de 2h' },
  { icon: MapPin, label: 'Dirección', val: COMPANY.direccion, desc: 'Sede principal' },
  { icon: Clock, label: 'Horario', val: 'Lun – Vie', desc: '9:00 – 18:00 UTC' },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: 'Soporte técnico', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const updateField = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Error al enviar el mensaje');
      }

      setStatus('success');
      setForm({ name: '', email: '', subject: 'Soporte técnico', message: '' });

      // Reset success after 5s
      setTimeout(() => setStatus('idle'), 5000);
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Error inesperado. Inténtalo de nuevo.');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <>
      {/* Hero */}
      <section className="contact-hero" style={{
        padding: '72px 32px 48px',
        background: 'var(--bg2)',
        borderBottom: '1px solid var(--border)',
        textAlign: 'center',
      }}>
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
            <span style={{
              background: 'linear-gradient(135deg, var(--cyan), var(--violet))',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>
              tu proyecto
            </span>
          </h1>
          <p style={{ fontSize: 17, color: 'var(--text2)', maxWidth: 460, margin: '0 auto', lineHeight: 1.65 }}>
            Nuestro equipo responde en menos de 2 horas en días hábiles.
          </p>
        </ScrollReveal>
      </section>

      {/* Contenido principal — dos columnas */}
      <section className="contact-section" style={{ padding: '72px 32px' }}>
        <div style={{ maxWidth: 1080, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: 48, alignItems: 'stretch' }}>

          {/* ── LEFT: info ── */}
          <ScrollReveal style={{ height: '100%' }}>
            <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 800, letterSpacing: '-0.5px', marginBottom: 8 }}>
                Estamos aquí para ayudarte
              </h2>
              <p style={{ fontSize: 16, color: 'var(--text2)', lineHeight: 1.7, marginBottom: 32 }}>
                Ya sea que tengas preguntas sobre nuestra plataforma, necesites soporte técnico o quieras explorar una integración empresarial, nuestro equipo está listo para asistirte.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {INFO.map(({ icon: Icon, label, val, desc }) => (
                  <div key={label} style={{
                    display: 'flex', alignItems: 'flex-start', gap: 16,
                    background: 'var(--bg2)', border: '1px solid var(--border)',
                    borderRadius: 14, padding: '16px 20px',
                    transition: 'border-color 0.18s',
                  }}
                    onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--borderac)'}
                    onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border)'}
                  >
                    <div style={{
                      width: 40, height: 40, borderRadius: 10, flexShrink: 0,
                      background: 'rgba(59,130,246,0.1)', color: 'var(--cyan)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <Icon size={18} strokeWidth={1.8} />
                    </div>
                    <div>
                      <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text3)', marginBottom: 3 }}>{label}</div>
                      <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 2 }}>{val}</div>
                      <div style={{ fontSize: 12, color: 'var(--text3)' }}>{desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* ── RIGHT: formulario ── */}
          <ScrollReveal delay={0.1} style={{ height: '100%' }}>
            <div style={{
              background: 'var(--bg2)', border: '1px solid var(--border)',
              borderRadius: 20, padding: 36, height: "100%"
            }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, marginBottom: 24, letterSpacing: '-0.3px' }}>
                Envíanos un mensaje
              </h3>

              <form onSubmit={handleSubmit}>
                <div className="contact-form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
                  {[
                    { label: 'Nombre', placeholder: 'Tu nombre completo', type: 'text', field: 'name' },
                    { label: 'Email', placeholder: 'tu@email.com', type: 'email', field: 'email' },
                  ].map(f => (
                    <div key={f.label}>
                      <label style={{ display: 'block', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text3)', marginBottom: 7 }}>
                        {f.label}
                      </label>
                      <input
                        type={f.type}
                        placeholder={f.placeholder}
                        required
                        value={form[f.field as keyof typeof form]}
                        onChange={e => updateField(f.field, e.target.value)}
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
                  <select
                    value={form.subject}
                    onChange={e => updateField('subject', e.target.value)}
                    style={{
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
                    <option>KYC / Verificación</option>
                    <option>Otro</option>
                  </select>
                </div>

                <div style={{ marginBottom: 24 }}>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text3)', marginBottom: 7 }}>Mensaje</label>
                  <textarea
                    rows={5}
                    required
                    placeholder="Cuéntanos cómo podemos ayudarte..."
                    value={form.message}
                    onChange={e => updateField('message', e.target.value)}
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

                {/* Status messages */}
                {status === 'success' && (
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: 8,
                    padding: '12px 16px', borderRadius: 10, marginBottom: 16,
                    background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)',
                    color: '#10B981', fontSize: 14, fontWeight: 500,
                  }}>
                    <CheckCircle size={16} /> ¡Mensaje enviado correctamente! Te responderemos pronto.
                  </div>
                )}

                {status === 'error' && (
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: 8,
                    padding: '12px 16px', borderRadius: 10, marginBottom: 16,
                    background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)',
                    color: '#EF4444', fontSize: 14, fontWeight: 500,
                  }}>
                    <AlertCircle size={16} /> {errorMsg}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  style={{
                    width: '100%', height: 48, borderRadius: 12,
                    background: status === 'loading'
                      ? 'var(--bg3)'
                      : 'linear-gradient(135deg, var(--cyan2), var(--violet))',
                    border: 'none', color: '#fff', fontSize: 15, fontWeight: 700,
                    cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                    display: 'flex', alignItems: 'center',
                    justifyContent: 'center', gap: 8, transition: 'all 0.18s',
                    fontFamily: 'var(--font-display)',
                    opacity: status === 'loading' ? 0.7 : 1,
                  }}
                  onMouseEnter={e => { if (status !== 'loading') (e.currentTarget as HTMLButtonElement).style.opacity = '0.87'; }}
                  onMouseLeave={e => { if (status !== 'loading') (e.currentTarget as HTMLButtonElement).style.opacity = '1'; }}
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> Enviando...
                    </>
                  ) : (
                    <>
                      Enviar mensaje <Send size={15} />
                    </>
                  )}
                </button>
              </form>

              <p style={{ fontSize: 12, color: 'var(--text3)', textAlign: 'center', marginTop: 14 }}>
                Al enviar aceptas nuestra{' '}
                <span style={{ color: 'var(--cyan)', cursor: 'pointer' }}>Política de Privacidad</span>
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
}