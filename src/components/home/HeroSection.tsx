'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';
import { COMPANY } from '@/lib/constants';

const IMAGES = [
  { id: 0, src: '/screen3.jpg', alt: 'Spot Trading' },
  { id: 1, src: '/screen2.jpg', alt: 'Binance Wallet' },
  { id: 2, src: '/screen1.jpg', alt: 'P2P Trading' },
];

interface HeroSectionProps {
  exchangeRef: React.RefObject<HTMLDivElement | null>;
}

export default function HeroSection({ exchangeRef }: HeroSectionProps) {
  const [positions, setPositions] = useState<('left' | 'center' | 'right')[]>([
    'left',
    'center',
    'right',
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPositions((prev) => {
        const leftIndex = prev.indexOf('left');
        const centerIndex = prev.indexOf('center');
        const rightIndex = prev.indexOf('right');

        const newPos = [...prev];
        newPos[leftIndex] = 'center';
        newPos[centerIndex] = 'right';
        newPos[rightIndex] = 'left';
        return newPos;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleVerDemo = () => {
    if (!exchangeRef.current) return;

    const targetY = exchangeRef.current.getBoundingClientRect().top + window.scrollY - 80;
    const startY = window.scrollY;
    const distance = targetY - startY;
    const duration = 1200; // ms — auméntalo para más lento
    let startTime: number | null = null;

    // Easing suave: easeInOutCubic
    const ease = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      window.scrollTo(0, startY + distance * ease(progress));
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  };

  return (
    <section
      id="inicio"
      className="hero-custom-bg"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '80px 20px',
        overflow: 'hidden',
      }}
    >
      <div
        className="orb"
        style={{
          width: 900,
          height: 900,
          background: '#2563EB',
          top: -450,
          left: '50%',
          transform: 'translateX(-50%)',
          opacity: 0.08,
        }}
      />

      {/* Contenido principal superior */}
      <div style={{ textAlign: 'center', zIndex: 10, marginBottom: '60px' }}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ marginBottom: '24px', display: 'flex', justifyContent: 'center' }}
        >
          <Image
            src="/logo_oficial.svg"
            alt="Antares Capitalx Logo"
            width={600}
            height={150}
            className="hero-logo"
            style={{ maxWidth: '100%', height: 'auto' }}
            priority
          />
        </motion.div>

        <motion.h1
          className="hero-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{
            fontFamily: 'var(--font-display), sans-serif',
            fontSize: 'clamp(24px, 4vw, 36px)',
            fontWeight: 500,
            letterSpacing: '-0.5px',
          }}
        >
          Trade seguro con <span className="grad">Antares Capitalx</span>
        </motion.h1>
      </div>

      {/* Subtítulo */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        style={{
          fontSize: 16,
          color: 'var(--text2)',
          maxWidth: 520,
          margin: '0 auto 32px',
          lineHeight: 1.65,
          textAlign: 'center',
        }}
      >
        {COMPANY.slogan}. {COMPANY.descripcion}
      </motion.p>

      {/* Botones CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        style={{ display: 'flex', gap: 12, justifyContent: 'center', marginBottom: 48 }}
      >
        <button
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '0 28px',
            height: 48,
            borderRadius: 12,
            background: 'linear-gradient(135deg, var(--cyan2), var(--violet))',
            border: 'none',
            color: '#fff',
            fontSize: 15,
            fontWeight: 700,
            cursor: 'pointer',
            transition: 'all 0.2s',
            fontFamily: 'var(--font-display)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = '0.87';
            e.currentTarget.style.transform = 'translateY(-1px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = '1';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          Crear cuenta gratis <ArrowRight size={15} />
        </button>

        <button
          onClick={handleVerDemo}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '0 24px',
            height: 48,
            borderRadius: 12,
            background: 'var(--bg3)',
            border: '1px solid var(--border)',
            color: 'var(--text2)',
            fontSize: 15,
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.18s',
            fontFamily: 'var(--font-display)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'var(--borderac)';
            e.currentTarget.style.color = 'var(--text)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'var(--border)';
            e.currentTarget.style.color = 'var(--text2)';
          }}
        >
          <Play size={14} /> Ver demo
        </button>
      </motion.div>

      {/* Contenedor de las 3 imágenes animadas */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '1000px',
          height: '600px',
          display: 'flex',
          justifyContent: 'center',
          marginTop: '20px',
          perspective: '1000px',
        }}
      >
        {IMAGES.map((img, index) => {
          const pos = positions[index];

          let x = 0;
          let scale = 1;
          let zIndex = 10;
          let rotateY = 0;
          let filter = 'brightness(1)';
          let opacity = 1;

          if (pos === 'center') {
            x = 0;
            scale = 1;
            zIndex = 30;
            rotateY = 0;
            filter = 'brightness(1) drop-shadow(0 20px 40px rgba(0,0,0,0.6))';
          } else if (pos === 'left') {
            x = -250;
            scale = 0.85;
            zIndex = 20;
            rotateY = 5;
            filter = 'brightness(0.6)';
            opacity = 0.9;
          } else if (pos === 'right') {
            x = 250;
            scale = 0.85;
            zIndex = 20;
            rotateY = -5;
            filter = 'brightness(0.6)';
            opacity = 0.9;
          }

          return (
            <motion.div
              key={img.id}
              animate={{
                x,
                scale,
                zIndex,
                rotateY,
                filter,
                opacity,
              }}
              transition={{
                type: 'spring',
                stiffness: 200,
                damping: 25,
                mass: 1,
              }}
              style={{
                position: 'absolute',
                width: '320px',
                height: '650px',
                borderRadius: '30px',
                overflow: 'hidden',
                cursor: pos === 'center' ? 'default' : 'pointer',
                boxShadow: '0 0 0 1px rgba(255,255,255,0.1)',
                transformOrigin: 'center center',
              }}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                style={{ objectFit: 'cover' }}
                unoptimized
              />
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}