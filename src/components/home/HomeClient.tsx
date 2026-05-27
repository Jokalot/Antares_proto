'use client';
import { useRef } from 'react';
import HeroSection from '@/components/home/HeroSection';
import ExchangeSection from '@/components/home/ExchangeSection';

export default function HomeClient() {
    const exchangeRef = useRef<HTMLDivElement>(null);

    return (
        <>
            <HeroSection exchangeRef={exchangeRef as React.RefObject<HTMLDivElement>} />
            <div ref={exchangeRef} style={{ scrollMarginTop: '80px' }}>
                <ExchangeSection />
            </div>
        </>
    );
}