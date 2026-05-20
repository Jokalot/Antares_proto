'use client';
import { useTheme } from '@/lib/theme-context';

export default function Logo({ width = 150 }: { width?: number }) {
    const { theme } = useTheme();

    return (
        <img
            src="/logo_oficial.svg"
            alt="Antares CapitalX"
            width={width}
            style={{
                display: 'block',
                filter: theme === 'dark' ? 'brightness(0) invert(1)' : 'none',
                transition: 'filter 0.3s ease',
            }}
        />
    );
}