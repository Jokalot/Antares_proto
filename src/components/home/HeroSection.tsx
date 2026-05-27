'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const IMAGES = [
  { id: 0, src: '/screen3.jpg', alt: 'Spot Trading' },
  { id: 1, src: '/screen2.jpg', alt: 'Binance Wallet' },
  { id: 2, src: '/screen1.jpg', alt: 'P2P Trading' },
];

export default function HeroSection() {
  // Posiciones lógicas iniciales: img 0 a la izquierda, img 1 al centro, img 2 a la derecha.
  const [positions, setPositions] = useState<('left' | 'center' | 'right')[]>(['left', 'center', 'right']);

  useEffect(() => {
    const interval = setInterval(() => {
      setPositions(prev => {
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

  return (
    <section
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
      <div className="orb" style={{ width: 900, height: 900, background: '#2563EB', top: -450, left: '50%', transform: 'translateX(-50%)', opacity: 0.08 }} />

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

      {/* Contenedor de las 3 imágenes animadas */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '1000px',
          height: '600px', // Aproximadamente la altura de los mockups
          display: 'flex',
          justifyContent: 'center',
          marginTop: '20px',
          perspective: '1000px'
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
                unoptimized // Evitar sobrecarga en desarrollo si las imágenes son locales temporales
              />
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}