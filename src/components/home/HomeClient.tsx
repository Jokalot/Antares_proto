'use client';
import { useRef } from 'react';
import HeroSection from '@/components/home/HeroSection';
import ExchangeSection from '@/components/home/ExchangeSection';
import AboutSection from '@/components/home/AboutSection';
import ContactSection from '@/components/home/ContactSection';

export default function HomeClient() {
    const exchangeRef = useRef<HTMLDivElement>(null);

    return (
        <>
            <HeroSection exchangeRef={exchangeRef as React.RefObject<HTMLDivElement>} />
            <div id="exchange" ref={exchangeRef} style={{ scrollMarginTop: '80px' }}>
                <ExchangeSection />
            </div>
            <AboutSection />
            <ContactSection />
        </>
    );
}